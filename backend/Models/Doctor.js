const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
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
        enum : ['active','pending'],
    },
    password: {
        type : String,
        required : true, 
    },
    license_no : {
        type : String,
        required : true, 
        trim : true,
        unique : true,
    },
    specialization : {
        type : mongoose.Types.ObjectId,
        required: true,
        ref : 'Specialization',
    },
    patients : [{
        type : mongoose.Types.ObjectId,
        ref : 'Patient',
    }],

    availability : [{
        day : {
            type : String,
        },
        date : {
            type: Date,
        },
        time_slots: [{
            start_time : {
                type : String,
            },
            end_time : {
                type : String,
            },
            booked : {
                type : Boolean,
            },
        }],
    }],
    appointments : [{
        type : mongoose.Types.ObjectId,
        ref : 'Appointment' 
    }],
    amount: { 
        type: Number, 
        required: true 
    }
})

module.exports = mongoose.model('Doctor',DoctorSchema);
