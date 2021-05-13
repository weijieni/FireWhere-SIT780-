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
const HumiditysSchema = new mongoose.Schema({
    region: {type: String},
    humidity: {type: String},
    warning: {type: String},
    urgent: {type: String}
},
{ collection:'humidity' }
)

const TemperaturesSchema = new mongoose.Schema({
    region: {type: String},
    tempereture: {type: String},
    warning: {type: String},
    urgent: {type: String}
},
{ collection:'temperature' }
)

const SeasonsSchema = new mongoose.Schema({
    region: {type: String},
    season: {type: String},
    warning: {type: String},
    urgent: {type: String}
},
{ collection:'season' }
)

const UserSchema = new mongoose.Schema({
    phone: {type: String},
    region: {type: String},
},
{ collection:'user' }
)

module.exports = mongoose.model('HumiditysSchema', HumiditysSchema);
module.exports = mongoose.model('TemperaturesSchema', TemperaturesSchema);
module.exports = mongoose.model('SeasonsSchema', SeasonsSchema);
module.exports = mongoose.model('UserSchema', UserSchema);
  