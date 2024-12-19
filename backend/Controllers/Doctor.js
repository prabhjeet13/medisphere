const Doctor = require('../Models/Doctor');


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
        const {first_name,last_name,email,phone,license_no,specialization} = req.body;

        const {userid} = req.user;

        if(!first_name || !last_name || !email || !phone || !license_no || !specialization || !userid)
        {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }

        const doctordetails = await Doctor.findById(userid);

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
                email : email,
                phone : phone,
                license_no : license_no,
                specialization : specialization
            },{new : true}).populate('specialization').populate('patients').exec();        



        return res.status(200).json({
            success : true,
            message : 'eit doctor !!!',
            doctor
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
        const { day, start_time, end_time } = req.body;
        
        const {userid}  = req.user; 
        

        if (!day || !start_time || !end_time || !userid) {
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


        const existingDay = doctor.availability.find((avail) => avail.day === day);


        if (!existingDay) {
            doctor.availability.push({
                day,
                time_slots: [{
                    start_time,
                    end_time,
                    booked: false
                }]
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
            doctordetails,
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

        const details = await Doctor.find({status : 'active'}).exec();

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

        const {specialization} = req.body;
        if(!specialization) {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }

        const details = await Doctor.find({specialization : specialization,status : 'active'}).exec();

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

