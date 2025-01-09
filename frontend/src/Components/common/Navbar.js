import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { seteditPermit , seteditData} from '../../slices/editSlice';
import {setUserData, setToken} from '../../slices/profileSlice'
const Navbar = () => {

  const navigate = useNavigate();
  const {userData} = useSelector((state) => state.profile);
  const dispatch = useDispatch();
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
    <div className='mx-auto w-11/12 max-w-[1260px] flex items-center justify-evenly text-black p-4 m-2 bg-gradient-to-r from-blue-700 to-slate-900'>
            <div onClick = { () => navigate('/')} className='font-mono text-xl font-bold  text-white bg-black p-2 rounded-full cursor-pointer transition-all duration-200 hover:scale-90'>
                    MediSphere
            </div>

            <ul className='flex items-center gap-2 font-mono text-lg font-semibold cursor-pointer'>
                <li onClick = { () => navigate('/')} className='bg-amber-300 p-1 px-3 rounded-full transition-all duration-200 hover:scale-90'> Home</li>
                <li onClick = { () => navigate('/about')} className='bg-amber-300 p-1 px-3 rounded-full transition-all duration-200 hover:scale-90'>About</li>
                <li onClick = {() => navigate('/doctors')} className='bg-amber-300 p-1 px-3 rounded-full transition-all duration-200 hover:scale-90'>Doctors</li>
                <li onClick = { () => navigate('/contact')} className='bg-amber-300 p-1 px-3 rounded-full transition-all duration-200 hover:scale-90'>Contact</li>
            </ul>

            {/* login sign up buttons and (dashboard-icon)*/}
            <div className='flex items-center gap-2 font-mono text-lg font-semibold cursor-pointer'>
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
                                        <div className='absolute bg-white text-black right-0 top-5 group-hover:visible invisible m-2 p-2'>
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
    </div>  
  )
}

export default Navbar