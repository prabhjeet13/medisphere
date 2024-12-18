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

        const userId = req.user;

        if(!first_name || !last_name || !email || !phone || !license_no || !specialization || !uesrId)
        {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }

        const doctordetails = await Doctor.findByIdAndUpdate
        ({_id : userId},
        { 
                first_name : first_name,
                last_name : last_name,
                email : email,
                phone : phone,
                license_no : license_no,
                specialization : specialization
        },{new : true}).populate('patients').exec();

        return res.status(200).json({
            success : true,
            message : 'eit doctor !!!',
            doctordetails
        });
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'server error at editing doctor',
        });
    }
}


exports.getAllDoctors = async (req,res) => {
    try {

        const details = await Doctor.find({}).exec();

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

        const details = await Doctor.find({specialization : specialization}).populate('patients').exec();

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

exports.getDoctorById = async (req,res) => {
    try {

        const userId = req.user;

        if(!userId) {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }

        const details = await Doctor.findById({_id : userId}).populate('patients').exec();

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