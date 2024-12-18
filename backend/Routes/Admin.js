const express = require('express');
const router = express.Router();
const {signupAdmin, signinAdmin} = require('../Controllers/Auth');
router.post('/signupadmin',signupAdmin);
router.post('/signinadmin',signinAdmin);
module.exports = router;