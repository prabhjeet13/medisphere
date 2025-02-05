// const Message = require('../Models/Message');

const Message  = require('../Models/Message');
const Doctor = require('../Models/Doctor');
const Patient = require('../Models/Patient');
const Conversation = require('../Models/Conversation');

exports.sendMessage = async (req,res) => {

    try {

        // console.log(req.body);
        // const {receiverId} = req.params; // receiverid
        const senderId  = req.user.userid; // sender id , user is login will send the message
        const {senderModel,receiverModel,text,receiverId,patient,doctor}  = req.body; 
        
        let conversation_data = await Conversation.findOne(
        {
            participants : {$all : [patient,doctor]},
        });

        if(!conversation_data)
        {
            // first time conversation
            conversation_data = await Conversation.create({
                participants : [patient,doctor],
                participantsModel: ["Patient", "Doctor"]
            });


                await Doctor.findByIdAndUpdate(
                    {_id : doctor},
                    {
                        $push : {
                            conversations : conversation_data._id,
                        }
                    }, {new : true}
                ) 
                await Patient.findByIdAndUpdate(
                    {_id : patient},
                    {
                        $push : {
                            conversations : conversation_data._id,
                        }
                    }, {new : true}
                )

        }

        const new_message = await Message.create({
            senderId,
            senderModel,
            receiverId,
            receiverModel,
            text
        });

        // or we can use find by id and update
        conversation_data.messages.push(new_message._id);
        await conversation_data.save();

        const conversation = await Conversation.findOne(
            {
                _id : conversation_data._id
            }
        ).populate({
            path : 'messages',
            populate : {
                path : 'senderId',
            }
        }).exec();

        const M = await Message.findById(new_message._id).populate("senderId").exec();

        const io = req.app.get("io");
        if (io) {
          io.to(`user_${receiverId}`).emit("receive_message", {
            senderId : M.senderId,
            text,
            conversationId: conversation_data._id,
            createdAt : new_message.createdAt,
          });
        }


        return res.status(200).json({
            success: true,
            message : `send successfully between ${senderId} and ${receiverId}`,
            messages : conversation.messages,
        });

        // new thing 
        // await Promise.all([conversation_data.save(), new_message.save()])

    }catch(error)
    {
        return res.status(500).json({
            success: false,
            message : 'server error',
        })
    }
}

exports.getMessage = async(req,res) => {
    try {
        
        const {patient,doctor} = req.body;

        if(!patient || !doctor)
        {
            return res.status(404).json({
                success: false,
                message : 'give all details',
            })
        }

       
        const conversation_data = await Conversation.findOne(
            {
                participants : {$all : [patient,doctor]}
            }
        ).populate({
            path : 'messages',
            populate : {
                path : 'senderId',
            }
        }).exec();

        if(!conversation_data)
        {
            return res.status(200).json({
                success: true,
                message : 'No messages found',
                conversation_messages : [],
            })
        }

        return res.status(200).json({
            success: true,
            message : 'fetch ok',
            conversation_messages : conversation_data.messages,
        })
    }catch(error)
    {
        return res.status(500).json({
            success: false,
            message : 'server error',
        })
    }
}

exports.getmyconversation = async(req,res) => {
    try {
        const {userid} = req.user;
        const {account_type} = req.body;

        if(account_type === "doctor")
        {
            const user_data = await Doctor.findById(userid)
                                    .populate({
                                        path : "conversations",
                                        populate : {
                                            path : "participants",
                                        }
                                    }).exec();

            return res.status(200).json({
                success: true,
                message : 'fetch ok',
                conversations : user_data.conversations,
            })
        }

        const user_data = await Patient.findById(userid)
                                        .populate({
                                            path : "conversations",
                                            populate : {
                                                path : "participants",
                                            }
                                        }).exec();

        return res.status(200).json({
            success: true,
            message : 'fetch ok',
            conversations : user_data.conversations,
        })


    }catch(error)
    {
        return res.status(500).json({
            success: false,
            message : 'server error',
        })
    }
}