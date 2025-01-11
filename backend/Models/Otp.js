const mongoose = require('mongoose');
const {sendMail} = require('../Utils/Nodemailer');
const OtpSchema = new mongoose.Schema({
    otp : {
        type: String,
        required:true,
        trim : true,
    },
    email : {
        type: String,
        required: true,
        trim : true,
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 60*10,
    }
});

OtpSchema.pre('save', async function (next) {
    
    try {
        if(this.isNew) {
               const response = await sendMail(this.email,'MediSphere - otp for email verification',`MediSphere - Valid for next 10 minutes: ${this.otp} So be Quick`)
        }
    }catch(error) {
        console.log('error at mailing otp',error);
    }
    next();
})

module.exports = mongoose.model('Otp',OtpSchema);