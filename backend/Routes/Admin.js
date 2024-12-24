const express = require('express');
const router = express.Router();
const {signupAdmin, signinAdmin} = require('../Controllers/Auth');
const {givePermission,editDetails} = require('../Controllers/Admin');
const {auth,isAdmin} = require('../Middlewares/Auth');

router.post('/signupadmin',signupAdmin);
router.post('/signinadmin',signinAdmin);
router.post('/givepermission',auth,isAdmin,givePermission);
router.post('/editadmindetails',auth,isAdmin,editDetails);
module.exports = router;