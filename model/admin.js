var mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
		unique: true
    },
    password: {
        type: String,
        required: true
    },
	role: {
        type: String,
        required: true
    }
	
},
{ collection:'admin' }
);

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin