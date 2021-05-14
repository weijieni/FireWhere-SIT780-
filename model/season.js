var mongoose = require('mongoose');
var testDb = mongoose.connect("mongodb+srv://admin_wni:020419Ni@fwcluster.gzfkv.mongodb.net/FWCluster?retryWrites=true&w=majority");

const SeasonSchema = new mongoose.Schema({
    region: {type: String},
    season: {type: String},
    warning: {type: String},
    urgent: {type: String}
},
{ collection:'season' }
)
const model = mongoose.model('Season', SeasonSchema)
module.exports = model