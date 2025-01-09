const express = require('express');
const router = express.Router();

const {sendMessage,getMessage,getmyconversation} = require('../Controllers/Message');
const {auth} = require('../Middlewares/Auth');

router.post('/getmessages',auth,getMessage);
router.post('/sendmessage/:receiverid',auth,sendMessage);
router.post('/getmyconversation',auth,getmyconversation);

module.exports = router;