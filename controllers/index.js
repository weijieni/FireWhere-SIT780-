
const ROLE = {
	ADMIN: 'admin',
	BASIC: 'basic'
}
const Humidity = require('../model/humidity')
const Temperature = require('../model/temperature')
const Season = require('../model/season')
const User = require('../model/user')
const Research = require('../model/research')
const Admin = require('../model/admin')
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTHTOKEN;


// const SMSclient = require('twilio')(accountSid, authToken);
	
exports.createuser = function(req, res) {  
  const { username, password, role} = req.body
  try {
       const response = Admin.create({
         username,
         password,
		 role
       })
       console.log('Admin created successfully: ', response)
  } catch (error) {
    console.log(error)
    return res.json({ status: 'error'})
  }
  res.json({status:'ok'})
};
	

exports.logout = function(req, res) {
  	req.logout();
	req.app.user = null;
    delete req.session;

  res.json({status:'ok'})
	};
	
exports.sms = function (req, res){
  if (accountSid == '')
  {
	  console.log("#######" + "Message sending disabled. For testing purpose, please ask @Leo Ni(in MsTeams) or wni@deakin.edu.au for Twilio account details." + "#######");
  }
  else
  {	  
	  SMSclient.messages.create({
		body: req.body.message,
		from: process.env.FROM_MOBILE,
		to: req.body.to
	  }).then(message => {
			console.log(message.sid)
			res.json({status:'ok'})
	  }).catch(err => console.log(err))
  }
};
	
exports.getcard = function (req, res){
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
}

exports.addcard = async (req,res)=>{
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

}

exports.test = function (req, res){
  res.end("Hello " + req.query.user_name + "!");
}

exports.getInsert = function (req, res) {
  getData(res)
  // console.log(collection)
}

exports.postInsert = function (req, res) {
  let data = req.body
  insertData(data, res)
}
// get test data
const getData = (res) => {
  testCollection.find().toArray((err, result) => {
    if (err) throw err
    res.send(result)
  })
  // collection = testCollection;
}

// insert test data
const insertData = (req,res) => {
  testCollection.insert(req, (err, result) => {
    if (!err){
      console.log('Data inserted', result)
      res.send({result: 200})
    } else {console.log(err)}
  })
};

exports.gethumidity = async (req,res)=>{

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
}
exports.addhumidity = async (req,res)=>{
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

}

exports.gettemperature = (req,res)=>{
  Temperature.find({}, (err, temperature) => {
    if (err) {
      //Return 400 for unspecified failure
      return res.status(400).json({ success: false, error: err });
    }
    if (!temperature.length) {
      //return 404 error if no entries found
	  console.log("Database empty");
      return res
        .status(404)
        .json({ success: false, error: "Database empty" });
    }
    //otherwise, return 200 with list of clients
    return res.status(200).json({ success: true, data: temperature });
  }).catch((err) => console.log(err));
}
exports.addtemperature = async (req,res)=>{
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
    return res.json({ status: 'error'})
  }

  res.json({status:'ok'})
}

exports.getseason = async (req,res)=>{
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
}
exports.addseason = async (req,res)=>{
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
 
}

exports.adduserdetail = async (req,res)=>{
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
}

