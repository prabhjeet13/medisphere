const express = require('express');
const router = express.Router();

const {addSpecialization,getallSpecializations} = require('../Controllers/Specialization');
const {auth,isAdmin} = require('../Middlewares/Auth');
router.post('/addspecialiation',auth,isAdmin,addSpecialization);
router.get('/getallspecializations',getallSpecializations);

module.exports = router;