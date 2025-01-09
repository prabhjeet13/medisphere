const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    senderId : {
                type : mongoose.Schema.Types.ObjectId,
                required: true,
                refPath : "senderModel"
            },
    senderModel : {
                type : String,
                required: true,
                enum : ['Doctor','Patient']
            },
    receiverId : {
                type : mongoose.Schema.Types.ObjectId,
                required: true,
                refPath : "receiverModel",
            },
    receiverModel : {
                type : String,
                required: true,
                enum : ['Doctor','Patient']
            },
    text : {
                type : String,
                required: true,
                default : '',
            }, 
    },{timestamps : true});
        
module.exports = mongoose.model('Message',MessageSchema);