import React from 'react'
import img1 from '../assets/images/doctorimage1.jpg'
import img2 from '../assets/images/doctorimage2.jpg'
import { useNavigate } from 'react-router-dom'
const Home = () => {

  const navigate = useNavigate();  

  return (
    <div className='mx-auto border-2 border-red-400 w-11/12 max-w-[1260px] mt-3 min-h-[100vh] flex-col'>
            
            <div onClick = {() => navigate('/signup')} className='mx-auto font-mono font-semibold text-white p-3 bg-orange-950 w-fit rounded-full m-2 cursor-pointer transition-all duration-200 hover:scale-90 text-lg'> 
               $ Doctor - Join Us $
            </div>
            <div className='flex gap-3 items-center justify-center p-2 m-2 mt-3'>
                <img src= {img1} width={400} className='rounded-md'/>
                <img src= {img2} width ={400} className='rounded-md'/>
            </div>

            <div className='w-[90%] font-mono text-white font-semibold text-lg mt-5 mx-auto'>
                <p>Your health is our priority. MediSphere seamlessly connects patients and doctors through a modern, user-friendly platform. Book appointments, manage consultations, and now enjoy real-time conversations with your healthcare providers—all in one place. Experience the future of healthcare with MediSphere, where convenience meets care.</p>
                <p className='mt-3'>MediSphere redefines the patient-doctor relationship by making it more accessible and interactive. With features like secure messaging, detailed appointment management, and personalized notifications, we’re building a bridge for better communication and healthier outcomes. Join us to transform your healthcare journey today!</p>
            </div>

            <div className='w-[90%] mx-auto border-2 border-red grid grid-cols-3 grid-rows-2 mt-5'>
                  <div className='bg-green-400 p-4 m-2 font-mono text-lg text-center'>"Good health begins with clear communication MediSphere makes it effortless."</div>  
                  <div className='bg-green-300 p-4 m-2 font-mono text-lg text-center'></div>  
                  <div className='bg-green-400 p-4 m-2 font-mono text-lg text-center'>"Empowering doctors and patients with tools to connect, collaborate, and care better every day."</div>  
                  <div className='bg-green-300 p-4 m-2 font-mono text-lg text-center'></div>  
                  <div className='bg-green-400 p-4 m-2 font-mono text-lg text-center'>"Your health matters, and so does the way you manage it—MediSphere simplifies it for you."</div>  
                  {/* <div className='bg-green-300 p-4 m-2 font-mono text-lg text-center'></div>   */}
            </div>
    </div>
  )
}

export default Home