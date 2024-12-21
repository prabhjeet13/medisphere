import React, { useState } from 'react'
import {useSelector} from 'react-redux';
import {signup} from '../services/db_functions';
import { useNavigate } from 'react-router-dom';

const Otp = () => {

   const [formData,setformdata] = useState({
        otp : "",
   });
   const navigate = useNavigate();
   const {signupData}   = useSelector((state) => state.signup);

  const textboxvaluechange = (e) => {
      setformdata((prev) => ({
        ...prev,
        [e.target.name] : e.target.value,
      }))
  } 

  const submitHandler = async (e) => {
        e.preventDefault();
        const finalData = {
            ...signupData,
            otp : formData.otp,
        }
        await signup(finalData,navigate);
  }

  return (
    <div className='w-11/12 mx-auto max-w-[1260px] flex items-center justify-center min-h-[100vh] flex-col'>
        <form className='flex-col gap-5 flex w-fit rounded-md border-2 border-orange-900 p-5 m-2 bg-purple-900'>
            <label className='text-white text-center text-xl font-mono font-bold'> OTP </label>
            <input onChange = {textboxvaluechange} value = {formData.otp} type = 'text' id = 'otp' name = 'otp' placeholder='otp' className='border-2 border-black py-2 rounded-md px-3 text-black' required/>
            <input type='submit' className='bg-yellow-500 text-black text-xl font-mono cursor-pointer px-4 py-2 rounded-md transition-all duration-200 hover:scale-95 hover:bg-yellow-400 w-full font-bold'/>
        </form>
        <p onClick = {() => navigate('/signup')} className='text-white font-bold text-center mb-48 cursor-pointer underline uppercase'> Back to sign-up  </p>
    </div>
  )
}

export default Otp
