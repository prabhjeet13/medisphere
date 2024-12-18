const Patient = require('../Models/Patient');
const Doctor = require('../Models/Doctor');
exports.getPatientById = async (req,res) => {
    try {

        const {userId} = req.body;

        if(!userId)
        {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            })
        }

        const details = Patient.findById(userId);

        if(!details)
        {
            return res.status(404).json({
                success : false,
                message : 'register first',
            })
        }


        return res.status(200).json({
            success : true,
            message : 'details fetch',
            details,
        })    

    }catch(error){
        return res.status(500).json({
            success : false,
            message : 'error at fetching details',
        })
    }
}

exports.editPatientDetails = async (req,res) => {
    try {
        const {first_name,last_name,email,phone,userId} = req.body;

        if(!first_name || !last_name || !email || !phone || !userId)
        {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }

        const patientdetails = await Patient.findByIdAndUpdate
        ( {_id : userId},
        { 
                first_name : first_name,
                last_name : last_name,
                email : email,
                phone : phone,
        },{new : true});

        return res.status(200).json({
            success : true,
            message : 'welcome patient !!!',
            patientdetails
        });
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'server error at editing patient',
        });
    }
}


// appointment

exports.appointment = async (req,res) => {
    try {
        const { doctorId, patientId, date, timeSlot } = req.body;

        if(!doctorId || !patientId || !date || !timeSlot) {
            return res.status(404).json({
                success: false,
                message : 'give all details',
            });
        }

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });


        const availability = doctor.availability.find(avail => avail.date.toISOString().split('T')[0] === date);
        if (!availability) return res.status(404).json({ message: 'No availability for this date' });

        const slot = availability.time_slots.find(slot => slot.start === timeSlot.start && slot.end === timeSlot.end);
        if (!slot || slot.booked) return res.status(400).json({ message: 'Slot not available' });

        slot.booked = true;
        

        // email is pending to both     

        const doctorDetails = await Doctor.findByIdAndUpdate({_id : doctorId},{
            $set: {
                'availability.$.time_slots.$[slot].booked': true,
            },
            $push : {
                patients : patientId,
            }
        },{new : true}).populate('patients').exec();


        return res.status(200).json({
            success: true,
            message: 'Appointment booked successfully',
            doctorDetails,
        });

    }catch(error) {
            return res.status(500).json({
                success: false,
                message : `${error}`,
            });
    }    
}