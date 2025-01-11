import React from 'react'
import img1 from '../assets/images/doctorimage3.jpg'
import img2 from '../assets/images/doctorimage4.jpg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const About = () => {
  const navigate = useNavigate(); 
  const {userData} = useSelector((state) => state.profile);

  return (
    <div className='mx-auto border-2 border-red-400 w-11/12 max-w-[1260px] mt-3 min-h-[100vh] flex-col'>
            
            {!userData && <div onClick = {() => navigate('/signup')} className='mx-auto font-mono font-semibold text-white p-3 bg-orange-950 w-fit rounded-full m-2 cursor-pointer transition-all duration-200 hover:scale-90 text-lg'> 
               $ Consult a Doctor $
            </div>}
            <div className='flex gap-3 items-center justify-center p-2 m-2 mt-3'>
                <img src= {img1} width={400} className='rounded-md'/>
                <img src= {img2} width ={400} className='rounded-md'/>
            </div>

            <div className='w-[90%] font-mono text-white font-semibold text-lg mt-5 mx-auto'>
                <p>At MediSphere, we are dedicated to transforming the healthcare experience by bridging the gap between patients and doctors. Our platform combines technology and care to provide seamless appointment booking, real-time communication, and efficient health management. We strive to empower individuals by making healthcare accessible, transparent, and interactive.</p>
                <p className='mt-3'>Our mission is to redefine the way healthcare works by focusing on convenience and connection. By offering innovative features like secure chatting, appointment tracking, and personalized notifications, we aim to enhance communication and build trust between patients and doctors. At MediSphere, we’re committed to creating a healthier world—one interaction at a time.</p>
            </div>

            <div className='w-[90%] mx-auto border-2 border-red grid grid-cols-3 grid-rows-2 mt-5'>
                  <div className='bg-green-300 p-4 m-2 font-mono text-lg text-center'></div>  
                  <div className='bg-cyan-400 p-4 m-2 font-mono text-lg text-center'>"Connecting care with convenience, because your health matters most."</div>  
                  <div className='bg-green-300 p-4 m-2 font-mono text-lg text-center'></div>  
                  <div className='bg-cyan-400 p-4 m-2 font-mono text-lg text-center'>"Empowering healthier lives through innovation and trust."</div>  
                  <div className='bg-green-300 p-4 m-2 font-mono text-lg text-center'></div>  
                  {/* <div className='bg-green-300 p-4 m-2 font-mono text-lg text-center'></div>   */}
            </div>
    </div>
  )
}

export default About