import React , {useState} from 'react'
import imagesignup from '../assets/images/doctorimage2.jpg'
import imagebg from '../assets/images/imagebg.jpg'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
const Login = () => {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [showpassword,setshowpassword] = useState(false);
    const [formData,setFormData] = useState({
      emailAddress: "",
      password : "",
    });
  
    const textboxvaluechange = (e) => {
      setFormData( (prev) => ({
         ...prev,
         [e.target.name] : e.target.value,
      }))
    }
  
  
    const onSubmitHandler = (e) => {
          e.preventDefault();
        //   signIn(navigate,formData,dispatch);
    }
  return (
    <div className='mx-auto max-w-[1260px] md:flex md:flex-row md:mt-5 justify-evenly items-center md:gap-3 flex flex-col-reverse sm:gap-52 sm:mt-36 mt-10'>
  
      <div className='md:w-[40%] flex flex-col gap-2 w-11/12'>
          <p className='text-xl font-semibold font-mono uppercase'> welcome again to medisphere !!!</p>
          <form className='flex flex-col gap-5 font-semibold' onSubmit={onSubmitHandler}>
              <div className='flex flex-col gap-1'>
                  <label htmlFor='emailAddress'>emailAddress</label>
                  <input onChange = {textboxvaluechange} value = {formData.emailAddress} type= 'text' name = 'emailAddress' id = 'emailAddress' placeholder='emailAddress' className='bg-white py-2 rounded-md  text-black border-2 border-black' required/>
              </div>

              <div className='flex flex-col gap-1 relative'>
                  <label htmlFor='password'>password</label>
                  <input onChange = {textboxvaluechange} value = {formData.password} type= {`${showpassword ? "text" : "password"}`} name = 'password' id = 'password' placeholder='password' className='bg-white py-2 rounded-md  text-black border-2 border-black' required/>
                  <FaEye onClick={() => {setshowpassword(false)} } className={`${showpassword ? "visible" : "invisible"} absolute text-lg top-10 right-2`}  />
                  <FaEyeSlash onClick={() => {setshowpassword(true)}} className= {`${showpassword ? "invisible" : "visible"} absolute text-lg top-10 right-2`} />
              </div>
              <button type='Submit' className='bg-yellow-400 text-black Sign In font-bold font-mono py-2 rounded-md transition-all duration-200 hover:bg-yellow-500 hover:scale-95'>Sign In</button>
          </form>
        
      </div>
      {/* image section */}
      <div className='md:w-[40%] relative max-500:invisible sm:w-[50%]'>
          <img src = {imagebg} className='absolute -right-3 -top-32'></img>
          <img src={imagesignup} className='absolute right-1 -top-28'></img>
      </div>
    </div>
  )
}

export default Login