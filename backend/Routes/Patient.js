const express = require('express');
const router = express.Router();

const {signupPatient, signinPatient} = require('../Controllers/Auth');
const {getPatientById,editPatientDetails, myAppointments} = require('../Controllers/Patient');
const {auth,isPatient,isDoctor} = require('../Middlewares/Auth');

router.post('/signuppatient',signupPatient);
router.post('/signinpatient',signinPatient);
router.post('/getpatientbyid',auth,isDoctor,getPatientById);
router.post('/editpatientdetails',auth,isPatient,editPatientDetails);

router.post('/myappointments',myAppointments)



module.exports = router;