import React , { useState } from 'react'
import imagebg from '../assets/images/imagebg.jpg';
import imagesignup from '../assets/images/doctorimage1.jpg';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
const Signup = () => {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [showpassword,setshowpassword] = useState(false);
    const [showconfirmpassword,setshowconfirmpassword] = useState(false);
  
    const [formData,setFormData] = useState({
      first_name: "",
      last_name: "",
      email: "",
      password : "",
      confirmPassword: "",
    });
  
    const textboxvaluechange = (e) => {
      setFormData( (prev) => ({
        ...prev,
        [e.target.name] : e.target.value,
      })
    )}
  
    const submitHandler = (e) => {
        e.preventDefault();
        
        if(formData.password !== formData.confirmPassword)
        {
          // toast.error('both passwords are not matched try again');
          return;
        }
        // // const signupDetails = {
        // //   ...formData,
        // //   accountType : "Coder",
        // // }
  
        // // // local storage mai add krna
        // // dispatch(setSignupData(signupDetails));
        // sendOtp(formData.emailAddress,navigate);
    }
  return (
    <div className='mx-auto w-11/12 max-w-[1260px] md:flex md:flex-row items-center justify-evenly md:mt-5 flex flex-col-reverse gap-36'>

        {/* form section */}
         <div className='w-[50%] flex flex-col gap-2'>
            <p className='font-bold font-mono text-lg text-black uppercase'>Join Us to insure a good health !!!</p>
            <form className='flex flex-col gap-5 font-mono font-semibold text-xl' onSubmit={submitHandler}>
                <div className='md:flex md:flex-row gap-2 flex flex-col'>
                      <div className='flex flex-col gap-1'>
                          <label htmlFor='firstName'>
                              firstName
                          </label>
                          <input onChange = {textboxvaluechange} value = {formData.firstName} type = 'text' id = 'firstName' name='firstName' placeholder='firstName' className='py-2 px-1 rounded-md  text-black bg-white border-2 border-black' required/>
                      </div>
                      <div className='flex flex-col gap-1'>
                          <label htmlFor='lastName'>
                              lastName
                          </label>
                          <input onChange = {textboxvaluechange} value = {formData.lastName} type = 'text' id = 'lastName' name='lastName' placeholder='lastName' className='py-2 rounded-md px-1 text-black bg-white border-2 border-black' required/>
                      </div>
                </div>

                <div className='flex flex-col md:w-[85%]'>
                  <label htmlFor='emailAddress'> 
                      emailAddress
                  </label>
                  <input onChange = {textboxvaluechange} value = {formData.emailAddress} type = 'text' id = 'emailAddress' name = 'emailAddress' placeholder='emailAddress' className='border-2 border-black py-2 rounded-md px-3 text-black' required/>
                </div>

              <div className='md:flex md:flex-row gap-2 flex flex-col'>
                <div className='flex flex-col gap-1 relative'>
                          <label htmlFor='password'> password </label>
                          <input onChange = {textboxvaluechange} value = {formData.password} type = {`${showpassword ? "text" : "password" }`} id = 'password' name='password' placeholder='password' className='px-1 border-2 border-black py-2 rounded-md  text-black' required/>
                          <FaEye onClick={() => {setshowpassword(false)} } className={`${showpassword ? "visible" : "invisible"} absolute text-lg top-11 right-2`}  />
                          <FaEyeSlash onClick={() => {setshowpassword(true)}} className= {`${showpassword ? "invisible" : "visible"} absolute text-lg top-11 right-2`} />
                </div>
                <div className='flex flex-col gap-1 relative'>
                <label htmlFor='confirmPassword'> confirm password </label>
                          <input onChange = {textboxvaluechange} value = {formData.confirmPassword} type = {`${showconfirmpassword ? "text" : "password" }`} id = 'confirmPassword' name='confirmPassword' placeholder='confirmPassword' className='border-2 border-black py-2 rounded-md  text-black px-1' required/>
                          <FaEye onClick={() => {setshowconfirmpassword(false)} } className={`${showconfirmpassword ? "visible" : "invisible"} absolute text-lg top-11 right-2`}  />
                          <FaEyeSlash onClick={() => {setshowconfirmpassword(true)}} className= {`${showconfirmpassword ? "invisible" : "visible"} absolute text-lg top-11 right-2`} />
                </div>
              </div>


              <button type='Submit' className='bg-yellow-500 text-black text-xl font-mono font-medium px-4 py-2 rounded-md w-[85%] transition-all duration-200 hover:scale-95 hover:bg-yellow-400'>
                  Join Us
              </button>

            </form>
         </div>

        {/* image part*/}
        <div className='w-[40%] relative md:visible invisible'>
          <img src= {imagebg} className='absolute -right-3 -top-40'/>
          <img src = {imagesignup} className='absolute -top-36'/>
        </div>
    </div>
  )
}

export default Signup