var mongoose = require('mongoose');

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