import React from 'react'
import { useSelector } from 'react-redux';
const AppoinmentsDone = () => {
  const {userData} = useSelector((state) => state.profile);


  if(!userData)
  {
     return (<div> No NextAppointments Found !!! </div>)
  }

  return (
    <div className='w-[82%] flex flex-col font-mono text-white'>
          <p className='p-2 m-2 underline text-white font-bold text-xl'> Appointments Done </p>
          {
             userData && userData.appointments.map((app,index) => {
  
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