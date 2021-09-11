var mongoose = require('mongoose');

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