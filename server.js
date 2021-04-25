const MongoClient = require('mongodb').MongoClient;
const bodyParser = require("body-parser");
let express = require("express");
let app = express();

let TestModel = require('./model/testDb');

let http = require('http').createServer(app);
let io = require('socket.io')(http);




// connect Mongodb Atlas
const uri = "mongodb+srv://admin_wni:020419Ni@fwcluster.gzfkv.mongodb.net/FWCluster?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let testCollection;
// let collection = [];


const openConnection = (message) => {
  client.connect((err, db) => {
    testCollection = client.db("FWCluster").collection("test");
    if (!err) {
      console.log("Database Connected")
    } else {
      console.log(err)
    }
  });
}

openConnection();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())

app.get("/", function(req, res, next) {
  TestModel.find({}, function(err, resData) {
    if (err) return next(err)
    res.render('index', {
      title: "TestDb",
      testData: resData
    })
  })
})

app.get("/test", function (request, response) {
  var user_name = request.query.user_name;
  response.end("Hello " + user_name + "!");
});

app.get("/insert", function (req, res) {
  getData(res)
  // console.log(collection)
});

app.post("/insert", function (req, res) {
  let data = req.body
  insertData(data, res)
});

// database methods

// insert test data
const insertData = (req,res) => {
  testCollection.insert(req, (err, result) => {
    if (!err){
      console.log('Data inserted', result)
      res.send({result: 200})
    } else {console.log(err)}
  })
};

// get test data
const getData = (res) => {
  testCollection.find().toArray((err, result) => {
    if (err) throw err
    res.send(result)
  })
  // collection = testCollection;
}


// socket test
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(()=>{
    socket.emit('number', parseInt(Math.random()*10));
  }, 1000);

});


http.listen(port,()=>{
  console.log("Listening on port ", port);
});

//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();
