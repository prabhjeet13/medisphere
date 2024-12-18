const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    first_name: {
        type : String,
        required : true, 
        trim : true,
    },
    last_name: {
        type : String,
        required : true, 
        trim : true,
    },
    email: {
        type : String,
        required : true, 
        trim : true,
        unique : true,
    },
    account_type: {
        type : String,
        required : true, 
        immutable : true, // prevent changes
    },
    status: {
        type : String,
        required : true, 
        enum : ['active'],
    },
    password: {
        type : String,
        required : true, 
    },
})
module.exports = mongoose.model('Admin',AdminSchema);
