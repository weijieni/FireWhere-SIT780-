const MongoClient = require('mongodb').MongoClient;
const bodyParser = require("body-parser");
// const mongoose = require ('mongoose')
let express = require("express");
let app = express()
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;


const Humidity = require('./model/humidity')
const Temperature = require('./model/temperature')
const Season = require('./model/season')
const User = require('./model/testDb')
const Research = require('./model/research')
const Admin = require('./model/admin')

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTHTOKEN;
// const accountSid = 'AC220f11629e7329aa75eb30753dec3db7';
// const authToken = '378d0138faa94b479eb4224ad58ce3fc';
const SMSclient = require('twilio')(accountSid, authToken);


let http = require('http').createServer(app);
let io = require('socket.io')(http);

// import jQuery from 'jquery'
// import a from './public/SMS'
// console.log(jQuery)

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

const port = 8080;
const host = '0.0.0.0';

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
       const response = await Humidity.create({
         region,
         humidity,
         warning,
         urgent
       })
       console.log('test data created successfully: ', response)
  } catch (error) {
    console.log(error)
    return res.json({ status: 'error'})
  }

  res.json({status:'ok'})

})

app.post('/api/temperatureinsert', async (req,res)=>{
  console.log(req.body)
  
  const { region, tempereture, warning, urgent} = req.body
  try {
       const response = await Temperature.create({
         region,
         tempereture,
         warning,
         urgent
       })
       console.log('test data created successfully: ', response)
  } catch (error) {
    console.log(error)
    return res.json({ status: 'error'})
  }

  res.json({status:'ok'})

})

app.post('/api/seasoninsert', async (req,res)=>{
  console.log(req.body)
  
  const { region, season, warning, urgent} = req.body
  try {
       const response = await Season.create({
         region,
         season,
         warning,
         urgent
       })
       console.log('test data created successfully: ', response)
  } catch (error) {
    console.log(error)
    return res.json({ status: 'error'})
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

// get humidity data
app.get("/api/gethumidity", (req,res) => {
  Humidity.find({}, (err, humidity) => {
    if (err) {
      //Return 400 for unspecified failure
      return res.status(400).json({ success: false, error: err });
    }
    if (!humidity.length) {
      //return 404 error if no entries found
      return res
        .status(404)
        .json({ success: false, error: "Database empty" });
    }
    //otherwise, return 200 with list of clients
    return res.status(200).json({ success: true, data: humidity });
  }).catch((err) => console.log(err));
})
      
// get temperature data
app.get("/api/gettemperature", (req,res) => {
  Temperature.find({}, (err, temperature) => {
    if (err) {
      //Return 400 for unspecified failure
      return res.status(400).json({ success: false, error: err });
    }
    if (!temperature.length) {
      //return 404 error if no entries found
      return res
        .status(404)
        .json({ success: false, error: "Database empty" });
    }
    //otherwise, return 200 with list of clients
    return res.status(200).json({ success: true, data: temperature });
  }).catch((err) => console.log(err));
})
   
// get season data
app.get("/api/getseason", (req,res) => {
  Season.find({}, (err, season) => {
    if (err) {
      //Return 400 for unspecified failure
      return res.status(400).json({ success: false, error: err });
    }
    if (!season.length) {
      //return 404 error if no entries found
      return res
        .status(404)
        .json({ success: false, error: "Database empty" });
    }
    //otherwise, return 200 with list of clients
    return res.status(200).json({ success: true, data: season });
  }).catch((err) => console.log(err));
})
   

// get test data
const getData = (res) => {
  testCollection.find().toArray((err, result) => {
    if (err) throw err
    res.send(result)
  })
  // collection = testCollection;
}

// research cards
app.post('/api/cardinsert', async (req,res)=>{
  const { header, imageUrl, category, content, link} = req.body
  try {
       const response = await Research.create({
        header,
        imageUrl,
        category,
        content,
        link
       })
       console.log('test data created successfully: ', response)
  } catch (error) {
    console.log(error)
    return res.json({ status: 'error'})
  }

  res.json({status:'ok'})

})

app.get("/api/getcard", (req,res) => {
  Research.find({}, (err, research) => {
    if (err) {
      //Return 400 for unspecified failure
      return res.status(400).json({ success: false, error: err });
    }
    if (!research.length) {
      //return 404 error if no entries found
      return res
        .status(404)
        .json({ success: false, error: "Database empty" });
    }
    //otherwise, return 200 with list of clients
    return res.status(200).json({ success: true, data: research });
  }).catch((err) => console.log(err));
})

// socket test
var count=0;
io.on('connection', function(socket) {
  console.log('a user connected');
  count++;
  io.emit('usercnt',count);
  socket.on('disconnect', function() {
    console.log('user disconnected');
    count--;
    io.emit('usercnt'.count);
  });
  setInterval(()=>{
    socket.emit('number', parseInt(Math.random()*10));
  }, 1000);

});


//insert admin account
app.post('/api/createAdmin', async (req,res)=>{
  console.log(req.body)
  
  const { username, password} = req.body
  try {
       const response = await Admin.create({
         username,
         password
       })
       console.log('Admin created successfully: ', response)
  } catch (error) {
    console.log(error)
    return res.json({ status: 'error'})
  }
  res.json({status:'ok'})

})

//admin session
app.use(session({
  secret:"verygoodsecret",
  resave: false,
  saveUninitialized: true
}));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user,done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done){
  Admin.findById(id, function (err,user) {
    done(err, user);
  });
});

// passport
passport.authenticateMiddleware = function authenticationMiddleware() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.json({
      status:'fail'
    })
  }
};

passport.use(new localStrategy(function (username, password, done) {
  console.log("username",password);
  Admin.findOne({ username: username }, function (err, user) {
    console.log("admin logged in",user.password===password);
    if (err) return done(err); 
    if(!user) return done(null, false, { message: 'Incorrect username'});

    if (user.password != password) {
      console.log('Incorrect password');

      return done(null, false, {message: 'Incorrect password'});
    }

    return done(null, user);
  });
}));

//Routes
app.post('/api/admin', passport.authenticateMiddleware() , (req,res) => {
  res.json({status:'ok',message:"admin logged in"})
})

app.post('/api/logout',(req,res)=>{
  req.session.passport.user=''
  console.log('req.session',req.session);
  res.json({status:'ok'})
})


app.post('/api/login',passport.authenticate('local'),(req,res)=>{
  res.json({status:'ok',message:"admin login successful"})
})


//chat
io.on('connection', socket => {
  // socket.emit('chat-message', 'Welcome to Firewhere')
  socket.on('send-chat-message', message =>{
    socket.broadcast.emit('chat-message', message)
  })
})

http.listen(port, host,()=>{
  console.log("Listening on port ", port);
});

//this is only needed for Cloud foundry 
// require("cf-deployment-tracker-client").track();

// send sms api
app.post('/api/sms', function (req, res){
  SMSclient.messages
  .create({
    body: req.body.message,
    from: '+14159428393',
    to: req.body.to
  })
  .then(message => {
    console.log(message.sid)
    res.json({status:'ok'})
  }).catch(err => console.log(err))
});
