import axios from 'axios';
import React from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { doctor } from '../services/apis';
import { setUserData } from '../slices/profileSlice';
import toast from 'react-hot-toast';

const NextAppointments = () => {

  const {userData,token} = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  
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
            dispatch(setUserData(response.data.details));
        }
    }catch(error)
    {
        toast.error('Medisphere - try again later');
    }
    toast.dismiss(tid);
  }

  if(!userData)
  {
     return (<div> No NextAppointments Found !!! </div>)
  }

  return (
    <div className='w-[82%] flex flex-col font-mono text-white'>
          <p className='p-2 m-2 underline text-white font-bold text-xl'> Next Appointments </p>
          {
             userData && userData.appointments.map((app,index) => {
  
                if(app.status === "next") 
                  return (
                      <details>
                            <summary className='p-1 m-2 bg-gray-400 text-black font-semibold rounded-md cursor-pointer flex justify-between items-center'>
                                    <span>Appointment {index + 1}</span>
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

export default NextAppointments



//   userData  && userData.appointments.map((app) => {
//            return (
//              <div className='p-2 m-2 border-2 border-red-600'>
//                <div>
//                  <p> Doctor Name:</p>
//                  <p> Dr. {app.doctor.first_name} {app.doctor.last_name}</p>
//                </div>
//                <div>
//                  <p> Patient Name:</p>
//                  <p> {app.patient.first_name} {app.patient.last_name}</p>
//                </div>
//                <div>
//                  <p> Day:</p>
//                  <p> {app.day}</p>
//                </div>
//                <div>
//                  <p> Date: </p>
//                  <p> {app.date} </p>
//                </div>
//                <div>
//                  <p> Start Time:</p>
//                  <p> {app.start_time}</p>
//                </div>
//                <div>
//                  <p> End Time:</p>
//                  <p> {app.end_time}</p>
//                </div>
//                <div>
//                  <p> charges:</p>
//                  <p> {app.amount}</p>
//                </div>
//              </div>
//            )  
//        })
// }