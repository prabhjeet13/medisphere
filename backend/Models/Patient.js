const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
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
    phone: {
        type : String,
        required : true, 
        trim : true,
    },
    account_type: {
        type : String,
        required : true, 
        immutable : true, // prevent changes
    },
    status: {
        type : String,
        required : true,
    },
    password: {
        type : String,
        required : true, 
    },
    appointments : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Appointment' 
    }],
    conversations : [{
            type : mongoose.Schema.Types.ObjectId,
            required: true,
            ref : "Conversation"
    }]
})


module.exports = mongoose.model('Patient',PatientSchema);