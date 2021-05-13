const MongoClient = require('mongodb').MongoClient;
const bodyParser = require("body-parser");
// const mongoose = require ('mongoose')
let express = require("express");
let app = express()
const axios = require('axios')

const Humiditys = require('./model/testDb')
const Temperatures = require('./model/testDb')
const Seasons = require('./model/testDb')
const User = require('./model/testDb')
// let test = require('./model/test');

let http = require('http').createServer(app);
let io = require('socket.io')(http);



// connect Mongodb Atlas
const uri = "mongodb+srv://admin_wni:020419Ni@fwcluster.gzfkv.mongodb.net/FWCluster?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017";

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

// insert test data --Yang
app.post('/api/humidityinsert', async (req,res)=>{
  console.log(req.body)
  
  const { region, humidity, warning, urgent} = req.body
  try {
       const response = await Humiditys.create({
         region,
         humidity,
         warning,
         urgent
       })
       console.log('test data created successfully: ', response)
  } catch (error) {
    console.log(error)
    return res.json({ statud: 'error'})
  }

  res.json({status:'ok'})

})

app.post('/api/temperatureinsert', async (req,res)=>{
  console.log(req.body)
  
  const { region, tempereture, warning, urgent} = req.body
  try {
       const response = await Temperatures.create({
         region,
         tempereture,
         warning,
         urgent
       })
       console.log('test data created successfully: ', response)
  } catch (error) {
    console.log(error)
    return res.json({ statud: 'error'})
  }

  res.json({status:'ok'})

})

app.post('/api/seasoninsert', async (req,res)=>{
  console.log(req.body)
  
  const { region, season, warning, urgent} = req.body
  try {
       const response = await Seasons.create({
         region,
         season,
         warning,
         urgent
       })
       console.log('test data created successfully: ', response)
  } catch (error) {
    console.log(error)
    return res.json({ statud: 'error'})
  }

  res.json({status:'ok'})

})

// post user details
app.post('/api/userdetail', async (req,res)=>{
  console.log(req.body)
  
  const { phone, region} = req.body
  try {
       const response = await User.create({
        phone,
        region
       })
       console.log('User created successfully: ', response)
  } catch (error) {
    console.log(error)
    return res.json({ statud: 'error'})
  }

  res.json({status:'ok'})

}) 


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
