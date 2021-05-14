var mongoose = require('mongoose');
var testDb = mongoose.connect("mongodb+srv://admin_wni:020419Ni@fwcluster.gzfkv.mongodb.net/FWCluster?retryWrites=true&w=majority");
// var testDb = mongoose.connect("mongodb://localhost:27017");

// connect to database
mongoose.connection.on("open", function(){
console.log("database connected")
})

mongoose.connection.on("error", function(error){
console.log("database connection failed " + error)
})

// test schema
// const HumiditySchema = new mongoose.Schema({
//     region: {type: String},
//     humidity: {type: String},
//     warning: {type: String},
//     urgent: {type: String}
// },
// { collection:'humidity' }
// )

// const TemperatureSchema = new mongoose.Schema({
//     region: {type: String},
//     tempereture: {type: String},
//     warning: {type: String},
//     urgent: {type: String}
// },
// { collection:'temperature' }
// )

// const SeasonSchema = new mongoose.Schema({
//     region: {type: String},
//     season: {type: String},
//     warning: {type: String},
//     urgent: {type: String}
// },
// { collection:'season' }
// )

const UserSchema = new mongoose.Schema({
    phone: {type: String},
    region: {type: String},
},
{ collection:'user' }
)


const model = mongoose.model('User', UserSchema)

module.exports = model
