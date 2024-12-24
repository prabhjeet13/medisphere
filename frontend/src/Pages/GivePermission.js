import React, { useEffect , useState } from 'react'
import {toast} from 'react-hot-toast';
import { doctor } from '../services/apis';
import axios from 'axios';
import { useSelector } from 'react-redux';
const GivePermission = () => {
  
  const [doctors,setdoctors] = useState([]);
  const {token} = useSelector((state) => state.profile);
  useEffect( () => {
    const fetch = async () => {
        try {
            const response = await axios.post(doctor.getalldoctorspending,{token});
            if(!response.data.success)
            {
                throw new Error('Medisphere - not able to do');
            }else {
                setdoctors(response.data.details);
            }
        }catch(error)
        {
            toast.error('Medisphere - server down try again later');
        }
    }

    fetch();
  },[]);

  const permitHandler = async () => {
      
  }

  if(doctors.length === 0)
  {
    return (<div className='text-white'> No Doctors Found !!! </div>)
  }

  return (
    <div className='w-[82%] font-mono flex flex-col gap-2'>
          {
             doctors && doctors.map((doctor,index) => {
                 return (
                      <details className='text-black cursor-pointer'>
                           <summary className='bg-gray-400 text-black flex justify-between items-center rounded-md p-1 m-2'>
                              <span> Doctor {index+1} </span>
                              <button onClick = {permitHandler} className='bg-yellow-500 text-black font-bold transition-all duration-200 hover:scale-90 p-1 m-1 rounded-md'> Permit ? </button>
                           </summary>
                           <div className='bg-white text-black font-bold flex flex-col p-1 m-1 rounded-md'>
                                      <div>
                                          <div> Dr. {doctor.first_name} {doctor.last_name} </div>
                                      </div>
                                      <div>
                                          <div>bank_account_number:  {doctor.bank_account_number}</div>
                                      </div>
                                      <div>
                                          <div>ifsc_code : {doctor.ifsc_code} </div>
                                      </div>
                                      <div>
                                          <div>license_no : {doctor.license_no} </div>
                                      </div>
                              </div>
                      </details>
                 )
             })
          }
    </div>
  )
}

export default GivePermission