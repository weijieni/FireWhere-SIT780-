var mongoose = require('mongoose');
var testDb = mongoose.connect("mongodb+srv://admin_wni:020419Ni@fwcluster.gzfkv.mongodb.net/FWCluster?retryWrites=true&w=majority");

// connect to database
mongoose.connection.on("open", function(){
console.log("database connected")
})

mongoose.connection.on("error", function(error){
console.log("database connection failed " + error)
})

// test schema
var testSchema = new mongoose.Schema({
    region: {type: String},
    humidity: {type: String},
    warning: {type: String},
    urgent: {type: String}
})

module.exports = mongoose.model('TestModel', testSchema);
  