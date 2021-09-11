var mongoose = require('mongoose');

const HumiditySchema = new mongoose.Schema({
    region: {type: String},
    humidity: {type: String},
    warning: {type: String},
    urgent: {type: String}
},
{ collection:'humidity' }
);

const model = mongoose.model('Humidity', HumiditySchema)
module.exports = model