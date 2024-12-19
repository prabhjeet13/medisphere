const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    patient : {
        type : mongoose.Types.ObjectId,
        ref : "Patient"
    },
    doctor : {
        type : mongoose.Types.ObjectId,
        ref : "Doctor"
    },
    date : {
        type : Date,
    },
    day : {
        type : String,
    },
    start_time : {
        type : String,
    },
    end_time : {
        type : String,
    },
    status : {
        type : String,
        enum : ['done','next'],
        default : 'next',
    },
    amount: { 
        type: Number, 
        required: true 
    }
});

module.exports = mongoose.model('Appointment',AppointmentSchema);