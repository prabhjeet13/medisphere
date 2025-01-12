import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { seteditPermit , seteditData} from '../../slices/editSlice';
import {setUserData, setToken} from '../../slices/profileSlice'
import { IoMdMenu } from "react-icons/io";
const Navbar = () => {

  const navigate = useNavigate();
  const {userData} = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [isopen,setisopen] = useState(true);                

  const logoutHandler = () => {
        dispatch(setUserData(null));
        dispatch(setToken(null));
        dispatch(seteditData(null));
        dispatch(seteditPermit(null));
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        localStorage.removeItem('editData');
        navigate('/');
  }

  return (
    <div className='mx-auto w-11/12 max-w-[1260px] navbar:flex navbar:flex-row navbar:items-center navbar:justify-evenly text-black p-4 m-2 bg-gradient-to-r from-blue-700 to-slate-900 relative flex flex-col gap-5 items-start'>
            
            {isopen && <>
                <div onClick = { () => navigate('/')} className='font-mono text-xl font-bold  text-white bg-black p-2 rounded-full cursor-pointer transition-all duration-200 hover:scale-90'>
                    MediSphere
                </div>

                <ul className='flex items-center navbar:w-fit gap-4 font-mono text-lg font-semibold cursor-pointer flex-wrap'>
                        <li onClick = { () => navigate('/')} className='bg-amber-300 p-1 px-3 rounded-full transition-all duration-200 hover:scale-90'> Home</li>
                        <li onClick = { () => navigate('/about')} className='bg-amber-300 p-1 px-3 rounded-full transition-all duration-200 hover:scale-90'>About</li>
                        <li onClick = {() => navigate('/doctors')} className='bg-amber-300 p-1 px-3 rounded-full transition-all duration-200 hover:scale-90'>Doctors</li>
                        <li onClick = { () => navigate('/contact')} className='bg-amber-300 p-1 px-3 rounded-full transition-all duration-200 hover:scale-90'>Contact</li>
                </ul>

            {/* login sign up buttons and (dashboard-icon)*/}
                <div className='navbar:flex navbar:flex-row navbar:items-center gap-3 flex flex-col navbar:w-fit font-mono text-lg font-semibold cursor-pointer'>
                        {
                                !userData && (<>
                                <div className='bg-amber-300 p-1 px-3 rounded-full transition-all duration-200 hover:scale-90'> 
                                        <p onClick={() => navigate('/signin')}>Log-in</p>
                                </div>    
                                <div className='bg-amber-300 p-1 px-3 rounded-full transition-all duration-200 hover:scale-90'> 
                                        <p onClick = { () => navigate('/signup')}>Join-us</p>
                                </div> 
                                </>)
                        }
                        {
                                userData && (
                                        <div className='uppercase bg-yellow-500 text-black rounded-full p-2 w-fit relative group'>
                                                MS
                                                <div className='absolute bg-white text-black navbar:right-0 navbar:top-5 z-10 group-hover:visible invisible m-2 p-2'>
                                                        <p className = 'p-2' onClick={() => navigate('/dashboard/myprofile')}>
                                                                dashboard
                                                        </p>
                                                        <hr className='bg-black'/>
                                                        <p className = 'p-2' onClick={logoutHandler}> logout </p>
                                                </div>
                                        </div>  
                                )
                        }     
                </div>
            </> }

            <div className='w-fit  bg-yellow-500 text-white absolute -right-3 p-1 cursor-pointer navbar:invisible visible'>
                {!isopen && <IoMdMenu onClick={() => setisopen(true)}/> }
                {isopen && <span onClick={() => setisopen(false)}>X</span>}
            </div>
    </div>  
  )
}

export default Navbar