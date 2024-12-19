const express = require('express');
const router = express.Router();
const {signupAdmin, signinAdmin} = require('../Controllers/Auth');
const {givePermission} = require('../Controllers/Admin');
const {auth,isAdmin} = require('../Middlewares/Auth');

router.post('/signupadmin',signupAdmin);
router.post('/signinadmin',signinAdmin);
router.post('/givepermission',auth,isAdmin,givePermission);
module.exports = router;