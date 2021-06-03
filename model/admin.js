var mongoose = require('mongoose');
var testDb = mongoose.connect("mongodb+srv://admin_wni:020419Ni@fwcluster.gzfkv.mongodb.net/FWCluster?retryWrites=true&w=majority");

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{ collection:'admin' }
);

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin