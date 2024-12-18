const express = require('express');
const router = express.Router();

const {signupPatient, signinPatient} = require('../Controllers/Auth');
const {getPatientById,editPatientDetails} = require('../Controllers/Patient');
const {auth,isPatient,isDoctor} = require('../Middlewares/Auth');

router.post('/signuppatient',signupPatient);
router.post('/signinpatient',signinPatient);
router.post('/getpatientById',auth,isDoctor,getPatientById);
router.post('/editpatientdetails',auth,isPatient,editPatientDetails);

module.exports = router;