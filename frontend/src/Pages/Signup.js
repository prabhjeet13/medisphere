import React , { useState } from 'react'
import imagebg from '../assets/images/imagebg.jpg';
import imagessignupdoc from '../assets/images/background_doctors.jpg';
import imagessignuppatients from '../assets/images/doctorimage1.jpg';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import {toast} from 'react-hot-toast';
import {sendOtp} from '../services/db_functions';
const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showpassword,setshowpassword] = useState(false);
    const [showconfirmpassword,setshowconfirmpassword] = useState(false);
    const [acc,setacc] = useState('patient');
    const [formData,setFormData] = useState({
      first_name: "",
      last_name: "",
      email: "",
      password : "",
      confirmPassword: "",
      phone : "",
      account_type : "",
      amount : "",
      license_no : "",
      specialization : "",
      status : ""
    });
    const [specialities,setspecialities] = useState([]);  
    const textboxvaluechange = (e) => {
      setFormData( (prev) => ({
        ...prev,
        [e.target.name] : e.target.value,
      })
    )}
    const submitHandler = async (e) => {
        e.preventDefault();
        if(formData.password !== formData.confirmPassword)
        {
          toast.error('both passwords are not matched try again');
          return;
        }
        formData.account_type = acc;
        if(acc === "patient")
        {
          formData.status = 'active';
        }else {
          formData.status = 'pending';
        }

        await sendOtp(formData,dispatch,navigate);
    }
  return (
    <div className='mx-auto w-11/12 max-w-[1260px] md:flex md:flex-row items-center justify-evenly md:mt-5 flex flex-col-reverse gap-36'>

        {/* form section */}
         <div className='w-[50%] flex flex-col gap-2'>
            <p className='font-bold font-mono text-lg text-black uppercase'>Join Us to insure a good health !!!</p>
            <form className='flex flex-col gap-5 font-mono font-semibold text-xl' onSubmit={submitHandler}>
                <div className='md:flex md:flex-row gap-2 flex flex-col rounded-full bg-red-900 w-fit'>
                      <div onClick = {() => setacc('patient')} className={`${acc === "patient" ? 'bg-blue-900' : 'bg-transparent'} text-white rounded-full p-2 m-2 cursor-pointer transition-all duration-200 hover:scale-90`}>
                        Patient    
                      </div>
                      <div onClick = {() => setacc('doctor')} className={`${acc === "doctor" ? 'bg-blue-900' : 'bg-transparent'} text-white rounded-full p-2 m-2 cursor-pointer transition-all duration-200 hover:scale-90`}>
                          Doctor
                      </div>
                </div>
                <div className='md:flex md:flex-row gap-2 flex flex-col'>
                      <div className='flex flex-col gap-1'>
                          <label htmlFor='first_name' className='text-white'>
                              first_name
                          </label>
                          <input onChange = {textboxvaluechange} value = {formData.first_name} type = 'text' id = 'first_name' name='first_name' placeholder='first_name' className='py-2 px-1 rounded-md  text-black bg-white border-2 border-black' required/>
                      </div>
                      <div className='flex flex-col gap-1'>
                          <label htmlFor='last_name' className='text-white'>
                              last_name
                          </label>
                          <input onChange = {textboxvaluechange} value = {formData.last_name} type = 'text' id = 'last_name' name='last_name' placeholder='last_name' className='py-2 rounded-md px-1 text-black bg-white border-2 border-black' required/>
                      </div>
                </div>
                <div className='flex flex-col md:w-[85%]'>
                  <label htmlFor='email' className='text-white'> 
                      email
                  </label>
                  <input onChange = {textboxvaluechange} value = {formData.email} type = 'text' id = 'email' name = 'email' placeholder='email' className='border-2 border-black py-2 rounded-md px-3 text-black' required/>
                </div>

                <div className='flex flex-col md:w-[85%]'>
                  <label htmlFor='phone' className='text-white'> 
                      phone
                  </label>
                  <input onChange = {textboxvaluechange} value = {formData.phone} type = 'text' id = 'phone' name = 'phone' placeholder='phone' className='border-2 border-black py-2 rounded-md px-3 text-black' required/>
                </div>

              {
                 acc === "doctor" && (
                  <>
                  <div className='flex flex-col md:w-[85%]'>
                    <label htmlFor='license_no' className='text-white'> 
                        license_no
                    </label>
                    <input onChange = {textboxvaluechange} value = {formData.license_no} type = 'text' id = 'license_no' name = 'license_no' placeholder='license_no' className='border-2 border-black py-2 rounded-md px-3 text-black' required/>
                  </div>

                  <div className='flex flex-col md:w-[85%]'>
                    <label htmlFor='specialization' className='text-white'> 
                      specialization
                    </label>
                    <input onChange = {textboxvaluechange} value = {formData.specialization} type = 'text' id = 'specialization' name = 'specialization' placeholder='specialization' className='border-2 border-black py-2 rounded-md px-3 text-black' required/>
                 </div>
                  <div className='flex flex-col md:w-[85%]'>
                    <label htmlFor='amount' className='text-white'> 
                      amount
                    </label>
                    <input onChange = {textboxvaluechange} value = {formData.amount} type = 'text' id = 'amount' name = 'amount' placeholder='amount' className='border-2 border-black py-2 rounded-md px-3 text-black' required/>
                 </div>
                  </>
                 )
              }


              <div className='md:flex md:flex-row gap-2 flex flex-col'>
                <div className='flex flex-col gap-1 relative'>
                          <label htmlFor='password' className='text-white'> password </label>
                          <input onChange = {textboxvaluechange} value = {formData.password} type = {`${showpassword ? "text" : "password" }`} id = 'password' name='password' placeholder='password' className='px-1 border-2 border-black py-2 rounded-md  text-black' required/>
                          <FaEye onClick={() => {setshowpassword(false)} } className={`${showpassword ? "visible" : "invisible"} absolute text-lg top-11 right-2 cursor-pointer`}  />
                          <FaEyeSlash onClick={() => {setshowpassword(true)}} className= {`${showpassword ? "invisible" : "visible"} absolute text-lg top-11 right-2 cursor-pointer`} />
                </div>
                <div className='flex flex-col gap-1 relative'>
                <label htmlFor='confirmPassword' className='text-white'> confirm password </label>
                          <input onChange = {textboxvaluechange} value = {formData.confirmPassword} type = {`${showconfirmpassword ? "text" : "password" }`} id = 'confirmPassword' name='confirmPassword' placeholder='confirm Password' className='border-2 border-black py-2 rounded-md  text-black px-1' required/>
                          <FaEye onClick={() => {setshowconfirmpassword(false)} } className={`${showconfirmpassword ? "visible" : "invisible"} absolute text-lg top-12 right-2 cursor-pointer`}  />
                          <FaEyeSlash onClick={() => {setshowconfirmpassword(true)}} className= {`${showconfirmpassword ? "invisible" : "visible"} absolute text-lg top-11 right-2 cursor-pointer`} />
                </div>
              </div>


              <button type='Submit' className='bg-yellow-500 text-black text-xl font-mono font-medium px-4 py-2 rounded-md w-[85%] transition-all duration-200 hover:scale-95 hover:bg-yellow-400'>
                  Join Us
              </button>

            </form>
         </div>
        {/* image part*/}
        <div className='w-[40%] relative md:visible invisible'>
          <img src= {imagebg} className='absolute -right-3 -top-40 rounded-md'/>
          <img src =  {`${acc == "doctor" ? imagessignupdoc : imagessignuppatients }`} className='absolute -top-36 rounded-md'/>
        </div>
    </div>
  )
}

export default Signup