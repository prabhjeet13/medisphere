const express = require('express');
const router = express.Router();
const {sendOtp} = require('../Controllers/Auth');
router.post('/sendotp',sendOtp);
module.exports = router;