var mongoose = require('mongoose');
var testDb = mongoose.connect("mongodb+srv://admin_wni:020419Ni@fwcluster.gzfkv.mongodb.net/FWCluster?retryWrites=true&w=majority");

const HumiditySchema = new mongoose.Schema({
    region: {type: String},
    humidity: {type: String},
    warning: {type: String},
    urgent: {type: String}
},
{ collection:'humidity' }
)

const model = mongoose.model('Humidity', HumiditySchema)
module.exports = model