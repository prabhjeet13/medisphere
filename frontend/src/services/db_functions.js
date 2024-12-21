
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
        navigate('/dashboard/myProfile');
    }catch(error) {
        toast.error('something wrong - try again later');
    }
    toast.dismiss(tid);
}
