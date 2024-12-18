// login and sign up for all users
const Admin = require('../Models/Admin');
const Doctor = require('../Models/Doctor');
const Patient = require('../Models/Patient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signupAdmin = async (req,res) => {
    try {
        const {first_name,last_name,email,account_type,status,password,confirmPassword} = req.body;

        if(!first_name || !last_name || !email || !account_type || !status || !password || !confirmPassword)
        {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }

        if(password !== confirmPassword) {
            return res.status(500).json({
                success : false,
                message : 'both passwords are not matched',
            });
        }

        const hashedpassword = await bcrypt.hash(password,10);

        const admindetails = await Admin.create(
            { 
                first_name : first_name,
                last_name : last_name,
                email : email,
                account_type : account_type,
                status : status,
                password : hashedpassword,
        });

        return res.status(200).json({
            success : true,
            message : 'welcome admin !!!',
            admindetails,
        });
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'server error at sign up admin',
        });
    }
}
exports.signupPatient = async (req,res) => {
    try {
        const {first_name,last_name,email,phone,account_type,password,confirmPassword} = req.body;

        if(!first_name || !last_name || !email || !phone || !account_type || !password || !confirmPassword)
        {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }

        if(password !== confirmPassword) {
            return res.status(500).json({
                success : false,
                message : 'both passwords are not matched',
            });
        }

        const hashedpassword = await bcrypt.hash(password,10);

        const patientdetails = await Patient.create(
            { 
                first_name : first_name,
                last_name : last_name,
                email : email,
                account_type : account_type,
                status : 'active',
                password : hashedpassword,
                phone : phone,
        });

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
exports.signupDoctor = async (req,res) => {
    try {
        const {first_name,last_name,email,phone,account_type,password,confirmPassword,license_no,specialization} = req.body;

        if(!first_name || !last_name || !email || !account_type || !phone || !password || !confirmPassword || !license_no || !specialization)
        {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }

        if(password !== confirmPassword) {
            return res.status(500).json({
                success : false,
                message : 'both passwords are not matched',
            });
        }

        const hashedpassword = await bcrypt.hash(password,10);

        const doctordetails = await Doctor.create(
            { 
                first_name : first_name,
                last_name : last_name,
                email : email,
                account_type : account_type,
                status : 'pending',
                password : hashedpassword,
                phone: phone,
                license_no : license_no,
                specialization : specialization
        });

        return res.status(200).json({
            success : true,
            message : 'welcome doctor !!!',
            doctordetails
        });
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'server error at sign up doctor',
        });
    }
}

exports.signinAdmin = async (req,res) => {
    try {
        const {email , password} = req.body;

        if(!email || !password)
        {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }


        const admindetails = await Admin.find({email : email});

        if(!admindetails) {
            return res.status(401).json({
                success : false,
                message : 'register first',
            });
        }

        if(await bcrypt.compare(password,admindetails.password))
        {

            // token and cookies develop kro then send to frontend
            const payload = {
                userid : admindetails._id,
                email : admindetails.email,
                account_type : admindetails.account_type,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn : "5h",
            });    

            return res.cookie('token',token,{
                httpOnly: true,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            }).status(200).json({
                success : true,
                message: 'login successfully',
                token,
                admindetails,
            })
        }else {
            return res.status(401).json({
                success : false,
                message : 'enter correct details',
            });
        }
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'server error at sign in admin',
        });
    }
}
exports.signinPatient = async (req,res) => {
    try {
        const {email , password} = req.body;

        if(!email || !password)
        {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }


        const patientdetails = await Patient.find({email : email});

        if(!patientdetails) {
            return res.status(401).json({
                success : false,
                message : 'register first',
            });
        }

        if(await bcrypt.compare(password,patientdetails.password))
        {

            // token and cookies develop kro then send to frontend
            const payload = {
                userid : patientdetails._id,
                email : patientdetails.email,
                account_type : patientdetails.account_type,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn : "5h",
            });    

            return res.cookie('token',token,{
                httpOnly: true,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            }).status(200).json({
                success : true,
                message: 'login successfully',
                token,
                patientdetails,
            })
        }else {
            return res.status(401).json({
                success : false,
                message : 'enter correct details',
            });
        }
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'server error at sign in patient',
        });
    }
}
exports.signinDoctor = async (req,res) => {
    try {
        const {email , password} = req.body;

        if(!email || !password)
        {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }
        const doctordetails = await Doctor.find({email : email});
        if(!doctordetails) {
            return res.status(401).json({
                success : false,
                message : 'register first',
            });
        }

        if(await bcrypt.compare(password,doctordetails.password))
        {

            // token and cookies develop kro then send to frontend
            const payload = {
                userid : doctordetails._id,
                email : doctordetails.email,
                account_type : doctordetails.account_type,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn : "5h",
            });    

            return res.cookie('token',token,{
                httpOnly: true,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            }).status(200).json({
                success : true,
                message: 'login successfully',
                token,
                doctordetails,
            })
        }else {
            return res.status(401).json({
                success : false,
                message : 'enter correct details',
            });
        }
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'server error at sign in doctor',
        });
    }
}