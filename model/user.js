var mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const UserSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	userid: {type: String, required: true, unique: true, minlength: 4},
	password: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
    region: {type: String},
	role: {type: String},
},
{ collection:'user' }
)

UserSchema.pre('save',function(next){
    var user=this;
    if(user.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err,hash)=>{
                user.password=hash;
                next();
            });            
        });
    }else{
        next();
    }
});

const model = mongoose.model('User', UserSchema)

module.exports = model
