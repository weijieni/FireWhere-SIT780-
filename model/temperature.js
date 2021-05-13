var mongoose = require('mongoose');
var testDb = mongoose.connect("mongodb+srv://admin_wni:020419Ni@fwcluster.gzfkv.mongodb.net/FWCluster?retryWrites=true&w=majority");

const TemperatureSchema = new mongoose.Schema({
    region: {type: String},
    tempereture: {type: String},
    warning: {type: String},
    urgent: {type: String}
},
{ collection:'temperature' }
)

const model = mongoose.model('Temperature', TemperatureSchema)
module.exports = model