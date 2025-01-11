const express = require('express');
const router = express.Router();

const {signupPatient, signinPatient} = require('../Controllers/Auth');
const {getPatientById,editPatientDetails, myAppointments,appointment_capturePayment,appointment_verifyPayment,sendPaymentSuccess} = require('../Controllers/Patient');
const {auth,isPatient,isDoctor} = require('../Middlewares/Auth');

router.post('/signuppatient',signupPatient);
router.post('/signinpatient',signinPatient);
router.post('/getpatientbyid',auth,isDoctor,getPatientById);
router.post('/editpatientdetails',auth,isPatient,editPatientDetails);

router.post('/appointment_capturepayment',auth,isPatient,appointment_capturePayment);
router.post("/verifysignature",auth,isPatient,appointment_verifyPayment);
router.post("/sendpaymentsuccess",auth,isPatient,sendPaymentSuccess);

router.post('/my_appointments',auth,isPatient,myAppointments)



module.exports = router;