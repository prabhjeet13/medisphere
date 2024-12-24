const Doctor = require('../Models/Doctor');
const Admin = require('../Models/Admin');
const {sendMail} = require('../Utils/Nodemailer');

exports.givePermission = async (req,res) => {
     try {

        const {license_no,bank_account_number,ifsc_code,doctorId,result} = req.body;

        if(!license_no || !doctorId || !result || !bank_account_number || !ifsc_code) 
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
            message : 'error-server'
        })
     }
}
exports.editDetails = async (req,res) => {
     try {

        const {first_name,last_name} = req.body;

        const {userid} = req.user;

        if(!first_name || !last_name || !userid) 
        {
            return res.status(404).json({
                success: true,
                message : 'give all details',
            });
        }

        const details = await Admin.findByIdAndUpdate(
                            {_id : userid},
                        {
                           first_name,
                           last_name, 
                        },{new:true});
        
        return res.status(200).json({
                    success: true,
                    message : 'fetch ok',
                    details,
        });

     }catch(error)
     {
        return res.status(500).json({
            success: false,
            message : 'error server'
        })
     }
}