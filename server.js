const MongoClient = require('mongodb').MongoClient;
const bodyParser = require("body-parser");
// const mongoose = require ('mongoose')
let express = require("express");
let app = express()
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
require('dotenv').config();


let http = require('http').createServer(app);
let io = require('socket.io')(http);
const router = require('./routes');
const formatMessage = require('./model/messages')

const uri = process.env.MONGODB_URL;
console.log(uri);

var mongoose = require('mongoose');
mongoose.connect(uri,{ useNewUrlParser: true ,  useUnifiedTopology: true },function(err, db) {

    app.db = db;
});


//Get the default connection
var db = mongoose.connection;

//check connection
db.once('open', function(){
  console.log('connected to MongoDB');
});

const port = process.env.PORT;
const host = '0.0.0.0';

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use('/api',router)

app.get("/", function(req, res, next) {
  TestModel.find({}, function(err, resData) {
    if (err) return next(err)
    res.render('index', {
      title: "TestDb",
      testData: resData
    })
  })
})

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

require('./passport/index')(passport);

//admin session
app.use(session({
  secret:"verygoodsecret",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next();
})


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


app.post('/api/admin', passport.authenticateMiddleware() , (req,res) => {
  res.json({status:'ok',message:"admin logged in"})
})

app.post('/api/login',passport.authenticate('local',{'session': true}),passport.authenticateMiddleware(),(req,res)=>{
	console.log("aaaaa" + req.user);
	req.app.user = req.user;
	req.session = req.session;
  res.json({status:'ok',message:"admin login successful"})
})

//chat
var count=0;
io.on('connection', socket => {
  console.log('a user connected');
  count++;

  //welcome message
  socket.emit('message', formatMessage('Welcome to FireWhere!'));

  socket.broadcast.emit('message', formatMessage('JOINED THE CHAT'));

  io.emit('usercnt',count);

  //disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected');
    count--;
    io.emit('message', formatMessage('LEFT THE CHAT'));
    io.emit('usercnt', count);
  });

  //listen for message
  socket.on('chatMessage', message => {
    io.emit('message', formatMessage(message));
  });

  setInterval(()=>{
    socket.emit('number', parseInt(Math.random()*10));
  }, 1000);

});

http.listen(port, host,()=>{
  console.log("Listening on port ", port);
});
