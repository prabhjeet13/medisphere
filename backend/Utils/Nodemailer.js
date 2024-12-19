const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendMail = async (email,title,body) => {

    try {
        let transporter = nodemailer.createTransport({
            service : "gmail",
            port : 465,
            secure : true,
            logger : true,
            debug : true,
            secureconnection : false,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS,
            },
            tls: {
                    rejectUnauthorized : true,
            }
        });

        let info = transporter.sendMail({
            from: process.env.MAIL_USER,
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`, 
        });

        return info;
    }catch(error)
    {
         console.log('error at mailing side',error);
    }

}

