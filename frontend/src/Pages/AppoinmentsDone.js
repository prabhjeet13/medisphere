import axios from 'axios';
import React , {useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { doctor ,patient} from '../services/apis';
import toast from 'react-hot-toast';
const AppoinmentsDone = () => {
  const {userData,token} = useSelector((state) => state.profile);
  const [appointments,setappointments] = useState([]);

  useEffect(() => {
    const fetch = async() => {
      const toastid = toast.loading('wait...');
       try {
         if(userData.account_type === "doctor") { 
            const response = await axios.post(doctor.my_appointments,{token});
            if(!response.data.success)
            {
                throw new Error('not able to do');
            }else {
                  toast.success('done...');
                  setappointments(response.data.details);
            }
         }else if(userData.account_type === "patient") {
              const response = await axios.post(patient.my_appointments,{token});
              if(!response.data.success)
              {
                  throw new Error('not able to do');
              }else {
                    toast.success('done...');
                    setappointments(response.data.details);
              }
         } 
       }catch(error)
       {
          toast.error('no data found try again later');
       }
       toast.dismiss(toastid);
    }
    fetch();
  },[])
  
  if(!userData)
  {
     return (<div> No NextAppointments Found !!! </div>)
  }
  return (
    <div className='w-[82%] flex flex-col font-mono text-white'>
          <p className='p-2 m-2 underline text-white font-bold text-xl'> Appointments Done </p>
          {
             userData &&  appointments && appointments.length > 0 && appointments.map((app,index) => {
  
                if(app.status === "done") 
                  return (
                      <details>
                            <summary className='p-1 m-2 bg-gray-400 text-black font-semibold rounded-md cursor-pointer'>
                                    <span>Appointment </span>
                            </summary>
                          <div className='p-2 m-2 bg-white text-black font-semibold flex flex-col gap-2 w-[80%] rounded-md'>
                          <div>
                            <p> Doctor Name:</p>
                            <p> Dr. {app.doctor.first_name} {app.doctor.last_name}</p>
                          </div>
                          <div>
                            <p> Patient Name:</p>
                            <p> {app.patient.first_name} {app.patient.last_name}</p>
                          </div>
                          <div>
                            <p> Day:</p>
                            <p> {app.day}</p>
                          </div>
                          <div>
                              <p> Date: </p>
                              <p> {app.date.split('T')[0]} </p>
                          </div>
                          <div>
                          <p> Start Time:</p>
                          <p> {app.start_time}</p>
                          </div>
                          <div>
                            <p> End Time:</p>
                            <p> {app.end_time}</p>
                          </div>
                          <div>
                            <p> charges:</p>
                            <p> {app.amount}</p>
                          </div>
                          </div>
                      </details>
                  )
            })
          } 
    </div>
  )
}

export default AppoinmentsDone