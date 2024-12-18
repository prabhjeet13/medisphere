const Patient = require('../Models/Patient');

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
        const {first_name,last_name,email,phone} = req.body;

        const userId = req.user;

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
            message : 'server error at sign up patient',
        });
    }
}