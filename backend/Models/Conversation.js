const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({

    participants : [{
        type : mongoose.Schema.Types.ObjectId,
        requied: true,
        refPath : "participantsModel",
    }],
    participantsModel : [{
        type : String,
        required: true,
        enum : ['Doctor','Patient'],
    }],
    messages : [{
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "Message",
    }],
},{timestamps: true});

module.exports = mongoose.model('Conversation',ConversationSchema);