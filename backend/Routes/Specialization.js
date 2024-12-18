const express = require('express');
const router = express.Router();

const {addSpecialization} = require('../Controllers/Specialization');
const {auth,isAdmin} = require('../Middlewares/Auth');
router.post('/addspecialiation',auth,isAdmin,addSpecialization);

module.exports = router;