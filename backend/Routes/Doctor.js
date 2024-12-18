const express = require('express');
const router = express.Router();

const {signupDoctor, signinDoctor} = require('../Controllers/Auth');
const {getMyPatients,editDoctorDetails,getAllDoctors,getDoctorsBySpeciality,getDoctorById} = require('../Controllers/Doctor');
const {auth,isDoctor} = require('../Middlewares/Auth');


router.post('/signupdoctor',signupDoctor);
router.post('/signindoctor',signinDoctor);
router.post('/getdoctorbyid',getDoctorById);
router.post('/getdoctorsbyspeciality',getDoctorsBySpeciality);
router.get('/getalldoctors',getAllDoctors);
router.post('/editdocterdetails',auth,isDoctor,editDoctorDetails);
router.post('getmypatients',auth,isDoctor,getMyPatients);
module.exports = router;
