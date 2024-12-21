import React from 'react'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {

  const navigate = useNavigate();

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
                <div className='bg-amber-300 p-1 px-3 rounded-full transition-all duration-200 hover:scale-90'> 
                        <p onClick={() => navigate('/signin')}>Log-in</p>
                </div>    
                <div className='bg-amber-300 p-1 px-3 rounded-full transition-all duration-200 hover:scale-90'> 
                        <p onClick = { () => navigate('/signup')}>Join-us</p>
                </div>        
            </div>
    </div>  
  )
}

export default Navbar