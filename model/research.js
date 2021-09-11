var mongoose = require('mongoose');

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