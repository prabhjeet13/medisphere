// verifying token for identifying the users 
// and provide their access rights

const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async (req,res,next) => {
    try {
    //    console.log(req.body); 
       const {token} = req.body || req.cookies.token; 
    //    console.log('ffhfhf',token);
       if(!token){
         return res.status(404).json({
            success : false,
            message : 'token is missing',
         });
       } 

       const decodepayload = jwt.verify(token,process.env.JWT_SECRET);
       req.user = decodepayload;

       next();

    }catch(error) {
        return res.status(500).json({
            success : false,
            message : `${error}`,
        })
    }
}
exports.isAdmin = (req,res,next) => {
    try {
        const {account_type} = req.user;
        if(account_type !== "admin") {
            
            return res.status(402).json({
                success : false,
                message : `not admin`,
            });
        }
        next();
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'not admin',
        })
    }
}
exports.isDoctor = (req,res,next) => {
    try {
        const {account_type} = req.user;
        if(account_type !== "doctor") {
            
            return res.status(402).json({
                success : false,
                message : `not doctor`,
            });
        }
        next();
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'not doctor',
        })
    }
}
exports.isPatient = (req,res,next) => {
    try {
        const {account_type} = req.user;
        if(account_type !== "patient") {
            
            return res.status(402).json({
                success : false,
                message : `not admin`,
            });
        }
        next();
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'not patient',
        })
    }
}