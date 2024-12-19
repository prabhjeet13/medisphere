const Specialization = require('../Models/Specialization');

exports.addSpecialization = async (req,res) => {
    try {
        
        const {name,description} = req.body;

        if(!name || !description) {
            
            return res.status(404).json({
                success : false,
                message : 'give all details',
            })
        }

        const details = await Specialization.create({
            name : name,
            description : description,
        });

        return res.status(202).json({
            success : true,
            message : 'speciality added',
        });
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'some error at spcialization adding',
        });
    }
}

exports.getallSpecializations = async (req,res) => {
    try {
        
    
        const details = await Specialization.find({});

        return res.status(202).json({
            success : true,
            message : 'speciality fetched',
            data : details,
        });
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'some error at spcialization adding',
        });
    }
}
