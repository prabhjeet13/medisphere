const Patient = require('../Models/Patient');
const Doctor = require('../Models/Doctor');
const Appointment = require('../Models/Appointment');
const {sendMail} = require('../Utils/Nodemailer');
const {instance} = require('../Config/Razorpay');
const crypto = require('crypto');
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

        const details = await Patient.findById(userId);

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
        const {first_name,last_name,phone} = req.body;

        const {userid} = req.user;

        if(!first_name || !last_name || !phone || !userid)
        {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }

        const patientdetails = await Patient.findByIdAndUpdate
        ( {_id : userid},
        { 
                first_name : first_name,
                last_name : last_name,
                phone : phone,
        },{new : true});

        return res.status(200).json({
            success : true,
            message : 'welcome patient !!!',
            details : patientdetails
        });
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'server error at editing patient',
        });
    }
}

// appointment
exports.appointment_capturePayment = async (req,res) => {
    try {
        
        const { doctorId, day, date,start_time, end_time,amount} = req.body;
        console.log(req.body);
        const {userid} = req.user; // patient id
        if(!doctorId || !userid || !date || !start_time || !end_time) {
            return res.status(404).json({
                success: false,
                message : 'give all details',
            });
        }
        
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json(
                { 
                    success: false,
                    message: 'Doctor not found' 
                }
            );
        }
        
        const patient = await Patient.findById(userid);
        if (!patient) {
            return res.status(404).json(
                { 
                    success: false,
                    message: 'patient not found' 
                }
            );
        }
        
        
        const existDay = doctor.availability.find((avail) => avail.day == day && avail.date === date);

        if(!existDay) {
            return res.status(404).json({
                success: false,
                message : 'day is not free',
            });
        }
        
        // {slot.booked == false && slot.start_time == start_time && slot.end_time == end_time}
        let timeSlot = null; // Changed to let
        for (let i = 0; i < existDay.time_slots.length; i++) {
            let slot = existDay.time_slots[i];
            const isNotBooked = slot.booked === false;
            const isStartMatch = slot.start_time === start_time;
            const isEndMatch = slot.end_time === end_time;
            if (isNotBooked && isStartMatch && isEndMatch) {
                timeSlot = slot;
                break;
            }
        }
        // console.log(timeSlot);
        if(!timeSlot) {
            return res.status(404).json({
                success: false,
                message : 'time is not free',
            });
        }

        
        // payment logic here   
        const options = {
            amount : amount*100,
            currency: "INR",
            receipt : Math.random(Date.now()).toString(),
        }
        // console.log(options);
        try {
            const paymentResponse = await instance.orders.create(options);
    
            res.json({
                success: true,
                message : paymentResponse
            })
        }catch(error) {
            res.json({
                success: false,
                message : error.message,
            }) 
        }
    }catch(error) {
            return res.status(500).json({
                success: false,
                message : `${error}`,
            });
    }    
}


exports.appointment_verifyPayment = async(req,res) => {
    try {
        
        const razorpay_order_id = req.body.razorpay_order_id;
        const razorpay_payment_id = req.body.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;
        const {doctorId, day, date,start_time, end_time,amount} = req.body;
        
        const {userid} = req.user;

        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !doctorId || !day || !date || !start_time || !end_time || !userid){
            res.json({
                success: false,
                message : 'payment failed',
            }) 
        }

        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac('sha256',process.env.RAZORPAY_SECRET)
                                        .update(body.toString())
                                        .digest("hex");

        if(expectedSignature === razorpay_signature)
        {
            const doctor = await Doctor.findById(doctorId); 
            const patient = await Patient.findById(userid);
            const existDay = doctor.availability.find((avail) => avail.day == day && avail.date === date);
            const timeSlot = await existDay.time_slots.find((slot) => slot.start_time === start_time && slot.end_time === end_time && slot.booked === false );
            timeSlot.booked = true;
            if (!doctor.patients.includes(userid)) {
                doctor.patients.push(userid);
            }
    
            const appointment = await Appointment.create({
                    doctor : doctorId,
                    patient : userid,
                    day,
                    date,
                    start_time,
                    end_time,
                    status : 'next',
                    amount,
            });
            doctor.appointments.push(appointment._id);    
            patient.appointments.push(appointment._id);    
            await doctor.save();    
            await patient.save();
            await sendMail(doctor.email,` MediSphere - appointment with ${patient.first_name}`,`${appointment}`);    
            await sendMail(patient.email,` MediSphere - appointment with Dr. ${doctor.first_name}`,`${appointment}`);    
            
            const doctordetails = await Doctor.findById(doctorId).populate('patients').populate('specialization').populate('appointments').exec();
            const patientdetails = await Patient.findById(userid).populate({
                path: 'appointments', 
                populate: [
                    { path: 'doctor' },    
                    { path: 'patient' },   
                ],
            }).exec();
          
            // const payoutDetails = {
            //     account_number: doctor.bank_account_number, 
            //     ifsc: doctor.ifsc_code,  
            //     amount: amount * 100,  
            //     currency: 'INR',
            //     method: 'IMPS',  
            //     purpose: 'Appointment Payment'
            //   };
        
            //   try {
            //     const payoutResponse = await razorpay.payouts.create(payoutDetails);
            //     console.log("Payout Response: ", payoutResponse);
            //   } catch (payoutError) {
            //     console.error("Error in payout: ", payoutError);
            //     return res.status(500).json({
            //       success: false,
            //       message: 'Payment confirmed but payout failed',
            //     });
            //   }

            return res.status(200).json({
                success: true,
                message : 'payment verified',
                Doctordetails  : doctordetails,
                Patientdetails : patientdetails,
            })
          
        }
        return res.status(500).json({
            success: false,
            message : 'payment not verified',
        });

    }catch(error) {
        return res.status(500).json({
            success: false,
            message : `${error}`,
        });
    }
}

exports.sendPaymentSuccess = async(req,res) => {
    try {
        const {orderId,paymentId,amount} = req.body;

        const userid = req.user.id;
        if(!orderId || !paymentId || !amount){
            res.json({
                success: false,
                message : 'fill all info',
            }) 
        }

        try {
            const userDetails = await Patient.findById({_id:userid});
            await sendMail(userDetails.email,'payment success',paymentSuccessEmail(`${userDetails.first_name}`,amount/100,orderId,paymentId));
        }catch(error)
        {
            res.json({
                success: false,
                message : error.message,
            }) 
        }

    }catch(error)
    {
        res.json({
            success: false,
            message : error.message,
        }) 
    }
}



// const doctorDetails = await Doctor.findByIdAndUpdate({_id : doctorId},{
        //     $set: {
        //         'availability.$.time_slots.$[slot].booked': true,
        //     },
        //     $push : {
        //         patients : userid,
        //     }
// },{new : true}).populate('patients').exec();


exports.myAppointments = async (req,res) => {
    try {
        const {userid} = req.user;

        const details = await Appointment.find({patient : userid}).populate('doctor').populate('patient').exec();

        return res.status(200).json({
            success : true,
            message : 'fetched ok',
            details,
        });
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'error at fetching next appoints',
        });
    }
}


