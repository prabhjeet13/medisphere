const Doctor = require('../Models/Doctor');
const Specialization = require('../Models/Specialization');
const Appointment = require('../Models/Appointment');
exports.getMyPatients = async (req,res) => {
    try {

        const {userId} = req.body;
        if(!userId)
        {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            })
        }

        const details = Doctor.findById(userId).populate('patients').exec();

        return res.status(200).json({
            success : true,
            message : 'details fetch',
            patients: details.patients,
        })    

    }catch(error){
        return res.status(500).json({
            success : false,
            message : 'error at fetching details',
        })
    }
}

exports.editDoctorDetails = async (req,res) => {
    try {
        // console.log(req.body);
        const {first_name,last_name,phone,location,license_no,specialization,amount,about_me,bank_account_number,ifsc_code} = req.body;
        const {userid} = req.user;
        if(!first_name || !last_name || !phone || !license_no || !specialization || !userid || !amount || !location || !about_me || !bank_account_number || !ifsc_code)
        {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }

        const doctordetails = await Doctor.findById(userid).populate('specialization').exec();
        // console.log('dd',doctordetails);

        if(doctordetails.status !== 'active') {
            return res.status(402).json({
                success: false,
                message: 'no permission to do',
            });
        }
        const doctor = await Doctor.findByIdAndUpdate(
            {_id : userid},
            {
                first_name : first_name,
                last_name : last_name,
                phone : phone,
                license_no : license_no,
                specialization : doctordetails.specialization._id,
                amount : amount,
                location : location,
                about_me: about_me,
                bank_account_number : bank_account_number,
                ifsc_code : ifsc_code,
            },{new : true}).populate('specialization').populate('patients').exec();        



        return res.status(200).json({
            success : true,
            message : 'eit doctor !!!',
            details : doctor,
        });
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'server error at editing doctor',
        });
    }
}
exports.editDoctorAvailability = async (req, res) => {
    try {
        const { date, day, start_time, end_time } = req.body;
        
        const {userid}  = req.user; 
        

        if (!date || !day || !start_time || !end_time || !userid) {
            return res.status(404).json({
                success: false,
                message: 'Please provide all required details (day, start_time, end_time, and userId).',
            });
        }


        // console.log('eeeheheh',userId);

        const doctor = await Doctor.findById(userid);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found',
            });
        }

        if(doctor.status !== "active") {
            return res.status(402).json({
                success: false,
                message: 'no permission to do',
            });
        }


        const existingDay = doctor.availability.find((avail) => avail.day === day && avail.date === date);


        if (!existingDay) {
            doctor.availability.push({
                day,
                time_slots: [{
                    start_time,
                    end_time,
                    booked: false
                }],
                date,
            });
        } else {
            const existingSlot = existingDay.time_slots.find(
                (slot) => slot.start_time === start_time && slot.end_time === end_time
            );

            if (!existingSlot) {
                existingDay.time_slots.push({
                    start_time,
                    end_time,
                    booked: false
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Time slot already exists for this day.',
                });
            }
        }

        await doctor.save();


        const doctordetails = await Doctor.findById(userid).populate('specialization').populate('patients').exec();

        return res.status(200).json({
            success: true,
            message: 'Doctor availability updated successfully!',
            details : doctordetails,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error while editing doctor availability.',
        });
    }
};
exports.deleteDoctorAvailability = async (req, res) => {
    try {
        const { date, day, start_time, end_time } = req.body;
        
        const {userid}  = req.user; 
        

        if (!date || !day || !start_time || !end_time || !userid) {
            return res.status(404).json({
                success: false,
                message: 'Please provide all required details (day, start_time, end_time, and userId).',
            });
        }


        // console.log('eeeheheh',userId);

        const doctor = await Doctor.findById(userid);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found',
            });
        }

        if(doctor.status !== "active") {
            return res.status(402).json({
                success: false,
                message: 'no permission to do',
            });
        }


        const existingDay = doctor.availability.find((avail) => avail.day === day && avail.date === date);


        if(existingDay)
        {

            const existingSlot = existingDay.time_slots.find(
                (slot) => slot.start_time === start_time && slot.end_time === end_time
            );
            
            if(existingSlot) {
                existingDay.time_slots.remove(existingSlot);
                if(existingDay.time_slots.length === 0)
                {
                    doctor.availability.remove(existingDay);
                }
            }    
        }


        await doctor.save();


        const doctordetails = await Doctor.findById(userid).populate('specialization').populate('patients').exec();

        return res.status(200).json({
            success: true,
            message: 'Doctor availability updated successfully!',
            details : doctordetails,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error while editing doctor availability.',
        });
    }
};

exports.getAllDoctors = async (req,res) => {
    try {

        const details = await Doctor.find({status : 'active'}).populate('specialization').exec();

        if(!details) {
            return res.status(404).json({
                success : false,
                message : 'register first',
            });
        }

        return res.status(200).json({
            success : true,
            message : 'fetch ok',
            details,
        });
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'server error at fetch doctor',
        });
    }
}
exports.getAllDoctorsPending = async (req,res) => {
    try {

        const details = await Doctor.find({status : 'pending'}).exec();

        if(!details) {
            return res.status(404).json({
                success : false,
                message : 'register first',
            });
        }

        return res.status(200).json({
            success : true,
            message : 'fetch ok',
            details,
        });
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'server error at fetch doctor',
        });
    }
}

exports.getDoctorsBySpeciality = async (req,res) => {
    try {

        // body mai name arra hai 
        // and we have stored ids of (specialization) in doctor schema 
        const {specialization} = req.body;
        // console.log(req.body);

        if(!specialization) {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }


        const fetchSpeciality_data = await Specialization.findOne({name : specialization});

        if(!fetchSpeciality_data)
        {
            return res.status(401).json({
                success : false,
                message : 'not found specialization',
            });
        }
        const details = await Doctor.find({specialization : fetchSpeciality_data._id,status : 'active'}).populate('specialization').exec();

        return res.status(200).json({
            success : true,
            message : 'fetch ok',
            details,
        });
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'server error at fetch doctor',
        });
    }
}

exports.getDoctorById = async (req,res) => {
    try {

        const {userId} = req.body;

        if(!userId) {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }

        const details = await Doctor.findById({_id : userId}).populate('specialization').populate('patients').populate('availability').exec();

        if(!details) {
            return res.status(404).json({
                success : false,
                message : 'register first',
            });
        }

        if(details.status !== 'active') {
            return res.status(402).json({
                success: false,
                message: 'no permission to do',
            });
        }


        return res.status(200).json({
            success : true,
            message : 'fetch ok',
            details,
        });
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'server error at fetch doctor',
        });
    }
}


exports.myAppointments = async (req,res) => {
    try {
        const {userid} = req.user;

        const details = await Appointment.find({doctor : userid});

        return res.status(200).json({
            success : true,
            message : 'fetched ok',
            details,
        });
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'error at fetching next appoints',
        });
    }
}

exports.doneAppointment = async (req,res) => {
    try {
        const {appointmentId} = req.body;
        const {userid} = req.user;

        if(!appointmentId || !userid)
        {
            return res.status(404).json({
                success : false,
                message : 'fetched ',
                details,
            });
        }

        const app = await Appointment.findById(appointmentId);

        app.status = 'done';
        
        await app.save();

        const details = Doctor.findById(userid).populate('patients').populate('specialization').populate({
            path: 'appointments', 
            populate: [
                { path: 'doctor' },    
                { path: 'patient' },   
            ],
        }).exec();

        // console.log(app);

        return res.status(200).json({
            success : true,
            message : 'fetched ok',
            details,
        });
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'error at fetching next appoints',
        });
    }
}




