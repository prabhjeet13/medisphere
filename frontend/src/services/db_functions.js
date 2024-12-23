
import {toast} from 'react-hot-toast';
import axios from 'axios';
import {otp,doctor,patient} from './apis';

import { setSignupData } from '../slices/signupslice';
import { setUserData , setToken} from '../slices/profileSlice';

export const sendOtp = async (formData,dispatch,navigate) => {
    const tid = toast.loading('Sending otp ...');
    try {
        const response = await axios.post(otp.sendotp,{email : formData.email, account_type : formData.account_type});
        if(!response.data.success) {
            throw new Error('not able to send otp');
        }
        dispatch(setSignupData(formData));
        toast.success('Otp sent !');
        navigate('/otp');
    }catch(error) {
        toast.error('try again later');
    }
    toast.dismiss(tid);
}

export const signup = async (formData,navigate) => {
    const tid = toast.loading('Saving data ...');
    try {
        let response = null;    
        if(formData.account_type === "patient")
        {
            response = await axios.post(patient.signup,formData);
        }else if(formData.account_type === "doctor") {
            response = await axios.post(doctor.signup,formData);
        }
        if(!response.data.success) {
            throw new Error('not able to sign up');
        }
        toast.success('data saved');
        navigate('/login');
    }catch(error) {
        toast.error('try again later');
    }
    toast.dismiss(tid);
}

export const signin = async (formData,dispatch,navigate) => {
    const tid = toast.loading('Saving data ...');
    try {
        let response = null;    
        
        if(formData.account_type === "patient")
        {
            response = await axios.post(patient.signin,formData);
            localStorage.setItem('userData',JSON.stringify(response.data.patientdetails));
            localStorage.setItem('token',JSON.stringify(response.data.token));
            dispatch(setUserData(response.data.patientdetails));
            dispatch(setToken(response.data.token));
        }else if(formData.account_type === "doctor") {
            response = await axios.post(doctor.signin,formData);
            localStorage.setItem('userData',JSON.stringify(response.data.doctordetails));
            localStorage.setItem('token',JSON.stringify(response.data.token));
            dispatch(setUserData(response.data.doctordetails));
            dispatch(setToken(response.data.token));
        }
        if(!response.data.success) {
            throw new Error('not able to login in');
        }
        toast.success('loginSuccessfully');
        navigate('/dashboard/myprofile');
    }catch(error) {
        toast.error('something wrong - try again later');
    }
    toast.dismiss(tid);
}

export const editDoctor = async (formData,dispatch,token) => {
    const tid = toast.loading('editing ...');
    try {
        const response = await axios.post(doctor.editdetails,{... formData,token});
        if(!response.data.success)
        {
            throw new Error('server down');
        }else {
            localStorage.setItem('userData',JSON.stringify(response.data.details));
            dispatch(setUserData(response.data.details));
            toast.success('editing done');
        }
    }catch(error)
    {
        toast.error('Medisphere - server down ... try again');
    }
    toast.dismiss(tid);
}
export const editDoctorSlot = async (formData,dispatch,token) => {
    const tid = toast.loading('wait ...');
    try {
        const response = await axios.post(doctor.editdoctorAvailaility,{... formData,token});
        if(!response.data.success)
        {
            throw new Error('server down');
        }else {
            localStorage.setItem('userData',JSON.stringify(response.data.details));
            dispatch(setUserData(response.data.details));
            toast.success('done');
        }
    }catch(error)
    {
        toast.error('Medisphere - server down ... try again');
    }
    toast.dismiss(tid);
}
export const deleteDoctorSlot = async (formData,dispatch,token) => {
    const tid = toast.loading('wait ...');
    try {
        const response = await axios.post(doctor.deleteDoctoravAilability,{... formData,token});
        if(!response.data.success)
        {
            throw new Error('server down');
        }else {
            localStorage.setItem('userData',JSON.stringify(response.data.details));
            dispatch(setUserData(response.data.details));
            toast.success('done');
        }
    }catch(error)
    {
        toast.error('Medisphere - server down ... try again');
    }
    toast.dismiss(tid);
}

export const editPatient = async (formData,dispatch,token) => {
    const tid = toast.loading('wait ...');
    try {
        const response = await axios.post(patient.editdetails,{... formData,token});
        if(!response.data.success)
        {
            throw new Error('server down');
        }else {
            localStorage.setItem('userData',JSON.stringify(response.data.details));
            dispatch(setUserData(response.data.details));
            toast.success('done');
        }
    }catch(error)
    {
        toast.error('Medisphere - server down ... try again');
    }
    toast.dismiss(tid);
}

function loadScript(src)
{
    return new Promise((resolve) =>{
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }

        script.onerror = () => { 
            resolve(false);
        }
        document.body.appendChild(script);
    });
}


export const do_appointment = async(formData,dispatch,navigate,token,userDetails)  => {
        try {
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")  

          if(!res)
          {
            toast.error('RAZORPAY SDK faild to load');
            return;
          }

          const orderResponse = await axios.post(patient.appointment,{...formData,token});
          
          if(!orderResponse.data.success){
            return new Error(orderResponse.data.message);
         }

         console.log('dd',orderResponse);


         const options = {
            key :process.env.RAZORPAY_KEY,
            currency : `${orderResponse.data.message.currency}`,
            amount: `${orderResponse.data.message.amount}`,
            order_id: `${orderResponse.data.message.id}`,
            name : 'MediSphere',
            description: 'thank you for booking the appointmnent',
            prefill : {
                name : `${userDetails.first_name}`,
                email : `${userDetails.email}`
            },
            handler : function(response) {
                sendPaymentSuccesfull(response,orderResponse.data.message.amount,token);
                verifyPayment({...response,...formData},token,navigate,dispatch);
            }
          }

          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
          paymentObject.on("payment.failed",function(response) {
             toast.error("oops, payment failed");
             console.log(response.error);
          })
        }catch(error) {
            console.log('error at buy course function',error.message);
            toast.error('could not make payment');
        }
}


const sendPaymentSuccesfull = async(response,amount,token) => {
    try {
        await axios.post(patient.SEND_PAYMENT_EMAIL,{
            orderId : response.razorpay_order_id,
            paymentId : response.razorpay_payment_id, 
            amount,
            token,
        });
    }catch(error)
    {
        console.log('error in send payment mail module',error.message);
    }
}

const verifyPayment = async(bodyData,token,navigate,dispatch) => {

    const toastid = toast.loading("...");

    try {
        const ob = {
            ...bodyData,
            token,
        }
        const response = await axios.post(patient.VERIFY_PAYMENT_API,ob);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }
        dispatch(setUserData(response.data.Patientdetails));
        localStorage.setItem('userData',JSON.stringify(response.data.Patientdetails));
        toast.success("payment succesfull");
    }catch(error)
    {
        toast.error('payment not done');
        console.log('error in verify payment module',error.message);
    } 
    toast.dismiss(toastid);
}