var mongoose = require('mongoose');
var testDb = mongoose.connect("mongodb+srv://admin_wni:020419Ni@fwcluster.gzfkv.mongodb.net/FWCluster?retryWrites=true&w=majority");

const ResearchSchema = new mongoose.Schema({
    header: {type: String},
    category: {type: String},
    imageUrl: {type: String},
    content: {type: String},
    link: {type: String}
},
{ collection:'research' }
)

const model = mongoose.model('Research', ResearchSchema)
module.exports = model