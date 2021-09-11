var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    phone: {type: String},
    region: {type: String},
},
{ collection:'user' }
)


const model = mongoose.model('User', UserSchema)

module.exports = model
