import axios from 'axios';
import React , {useState,useEffect} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { doctor ,patient} from '../services/apis';
import { setUserData } from '../slices/profileSlice';
import {useNavigate}  from 'react-router-dom'
import toast from 'react-hot-toast';

const NextAppointments = () => {

  const {userData,token} = useSelector((state) => state.profile);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appointments,setappointments] = useState([]);

  const doneHandler = async (id) => {
    const tid = toast.loading('wait ...');
    try {
        const response = await axios.post(doctor.done_appointment,{appointmentId : id,token});
        if(!response.data.success)
        { 
            throw new Error('error - try again');
        }else {
            toast.success('done');
            localStorage.setItem('userData',JSON.stringify(response.data.details));
            setappointments(response.data.details.appointments);
            dispatch(setUserData(response.data.details));
            navigate('/dashboard/appointments_done')
        }
    }catch(error)
    {
        toast.error('Medisphere - try again later');
    }
    toast.dismiss(tid);
  }

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
    <div className='sidebar:w-[82%] w-full flex flex-col font-mono text-white'>
          <p className='p-2 m-2 underline text-white font-bold text-xl'> Next Appointments </p>
          {
             userData && appointments && appointments.length > 0 && appointments.map((app,index) => {
  
                if(app.status === "next") 
                  return (
                      <details>
                            <summary className='p-1 m-2 bg-gray-400 text-black font-semibold rounded-md cursor-pointer flex justify-between items-center'>
                                    <span>Appointment:</span>
                              { userData.account_type === "doctor" && <button onClick = {() => doneHandler(app._id)} className='p-2 rounded-full w-fit bg-yellow-500 text-black font-bold transition-all duration-200 hover:scale-90'> done ?</button> }
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

export default NextAppointments;