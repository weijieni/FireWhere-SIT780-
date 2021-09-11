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

AdminSchema.pre('save',function(next){
    var admin=this;
    if(admin.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(admin.password,salt,(err,hash)=>{
                admin.password=hash;
                next();
            });
            
        });
    }else{
        next();
    }
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin