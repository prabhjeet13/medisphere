const express = require('express');
const router = express.Router();

const {signupDoctor, signinDoctor} = require('../Controllers/Auth');
const {getMyPatients,editDoctorDetails,deleteDoctorAvailability,getAllDoctorsPending,getAllDoctors,getDoctorsBySpeciality,getDoctorById,editDoctorAvailability,myAppointments,doneAppointment} = require('../Controllers/Doctor');
const {auth,isDoctor,isAdmin} = require('../Middlewares/Auth');


router.post('/signupdoctor',signupDoctor);
router.post('/signindoctor',signinDoctor);
router.post('/getdoctorbyid',getDoctorById);
router.post('/getdoctorsbyspeciality',getDoctorsBySpeciality);
router.get('/getalldoctors',getAllDoctors);
router.post('/getalldoctorspending',auth,isAdmin,getAllDoctorsPending);
router.post('/editdoctordetails',auth,isDoctor,editDoctorDetails);
router.post('/deletedoctoravailability',auth,isDoctor,deleteDoctorAvailability);
router.post('/getmypatients',auth,isDoctor,getMyPatients);
router.post('/editdoctoravailability',auth,isDoctor,editDoctorAvailability);
router.post('/done_appointment',auth,isDoctor,doneAppointment);
router.post('/myappointments',auth,isDoctor,myAppointments)


module.exports = router;
