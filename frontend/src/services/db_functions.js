
import {toast} from 'react-hot-toast';
import axios from 'axios';
import {otp,doctor,patient} from './apis';

import { setSignupData } from '../slices/signupslice';
import { setUserData } from '../slices/profileSlice';
exports.sendOtp = async (formData,dispatch,navigate) => {
    try {
        toast.loading('Sending otp ...');
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
}

exports.signup = async (formData,navigate) => {
    try {
        toast.loading('Saving data ...');
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
}

exports.signin = async (formData,dispatch,navigate) => {
    try {
        toast.loading('Saving data ...');
        let response = null;    
        
        if(formData.account_type === "patient")
        {
            response = await axios.post(patient.signin,formData);
        }else if(formData.account_type === "doctor") {
            response = await axios.post(doctor.signin,formData);
        }

        if(!response.data.success) {
            throw new Error('not able to login in');
        }
        toast.success('loginSuccessfully');
        dispatch(setUserData(formData));
        navigate('/dashboard/myProfile');
    }catch(error) {
        toast.error('try again later');
    }
}