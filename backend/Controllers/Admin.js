const Doctor = require('../Models/Doctor');

const {sendMail} = require('../Utils/Nodemailer');

exports.givePermission = async (req,res) => {
     try {

        const {license_no,doctorId,result} = req.body;

        if(!license_no || !doctorId || !result) 
        {
            return res.status(404).json({
                success: true,
                message : 'give all details',
            });
        }

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found.',
            });
        }

        // checking criteria
        
        if(result) {
            doctor.status = 'active';
            await doctor.save();
            // send mail to doctor;
            await sendMail(doctor.email,'MediSphere - Access granted','Now you have permission to login into medisphere !!!');
            return res.status(200).json({
                success: true,
                message : 'active success',
            });

        }

        await Doctor.findByIdAndDelete(doctorId);

        return res.status(400).json({
            success: false,
            message: 'Doctor is not eligible, record deleted.',
        });
        
     }catch(error)
     {
        return res.status(500).json({
            success: false,
            message : 'error server'
        })
     }
}