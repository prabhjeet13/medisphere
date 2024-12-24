import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doctor } from '../services/apis';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useDispatch, useSelector} from 'react-redux';
import { do_appointment } from '../services/db_functions';
const Doctor = () => {
  const { doctorId } = useParams();
  const [doctordata, setdoctordata] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [day,setday] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userData,token} = useSelector((state) => state.profile);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.post(doctor.getdoctorsbyid, { userId: doctorId });
        if (!response.data.success) {
          throw new Error('Unable to fetch doctor data');
        } else {
          setdoctordata(response.data.details);
          setAvailability(response.data.details.availability); // Assuming availability is part of doctor details
        }
      } catch (error) {
        toast.error('Medisphere - Server down, please try again later');
      }
    };

    fetchDoctorData();
  }, [doctorId]);

  const handleDateClick = (date) => {
    // Normalize the date by removing the time component (use toDateString or format it to YYYY-MM-DD)
    const selectedDateStr = date.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }) // or date.toISOString().split('T')[0] for YYYY-MM-DD format  
    // console.log(date.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }));
    // Compare with the normalized date string in the availability data
    const availableDay = availability.find((day) => day.date === selectedDateStr);
    
    if(!availableDay)
    {
        toast.error('Medisphere - Select only available date');
        return;
    }
  
    console.log(availableDay);
    let time_slots = [];
    for(let slot of availableDay.time_slots)
    {
        if(slot.booked === false)
        {
          time_slots.push(slot);
        }
    }
    console.log(time_slots);
    if (availableDay && time_slots && time_slots.length > 0) {
      setSelectedDate(selectedDateStr);
      setTimeSlots(time_slots);  // Set time slots based on selected date
      setday(availableDay.day);
    } else {
      setSelectedDate(null);
      setTimeSlots([]);
    }
  };  
  // css for day click jb hogi
  const tileClassName = ({ date }) => {
    const dateStr = date.toDateString();  // Format date to YYYY-MM-DD
    const availableDay = availability.find((day) => new Date(day.date).toDateString() === dateStr);

    if (availableDay && availableDay.time_slots.some(slot => !slot.booked)) {
      return 'text-green-500 underline font-bold';  // Green background for available dates with hover effect
    }

    return '';  // No class for unavailable days
  };


  const [start,set_start] = useState('');
  const [end,set_end] = useState('');
  const [formdata,setformdata]  = useState({
    day : "",
    date : "",
    start_time : "",
    end_time : "",
    amount : "",
    status : "",
    doctorId : "",
  })

  const onSubmitHandler = async (e) => {
      e.preventDefault();

      if(!userData)
      {
          toast.error('Medisphere - You are not login So First Login Youself');
          return;
      }

      if(userData.account_type === "doctor")
      {
          toast.error('Medisphere - only for patients');
          return;
      }

      try {
         if(doctordata && selectedDate && start && end && timeSlots && day && userData) {
            formdata.doctorId = doctorId;
            formdata.status = 'next';
            formdata.start_time = start;
            formdata.end_time = end;
            formdata.date = selectedDate;
            formdata.day = day;
            formdata.amount = doctordata.amount;
            console.log(formdata);

            await do_appointment(formdata,dispatch,navigate,token,userData);
         }else {
             toast.error('Medisphere - select correct date !')
         }
      }catch(error)
      {
          toast.error('Medisphere - try again later')
      }
  }

  // Loading state
  if (!doctordata) {
    return <div className='text-white'>
            No doctor found !!!
    </div>;
  }

  return (
    <div className='w-11/12 max-w-[1260px] mx-auto'>
      {
        doctordata && (
          <div className='flex gap-10'>
            <div className='flex flex-col gap-6 mt-10 w-[60%] border-8 border-orange-900 p-2'>
              {/* Doctor Details */}

              <div className=' text-black bg-yellow-400 p-2 w-fit rounded-full font-mono font-semibold text-lg transition-all duration-200 hover:scale-90 cursor-pointer'>
                    Chat with Me ?
              </div>
              
              <div className='text-white'>
                <p className='text-xl underline font-bold'>Doctor Name</p>
                <div className='text-lg flex items-center font-semibold gap-2'>
                  <p>{doctordata.first_name}</p>
                  <p>{doctordata.last_name}</p>
                </div>
              </div>

              <div className='text-white'>
                <p className='underline text-xl font-bold'>Contact Details</p>
                <p className='text-white text-lg font-semibold'>email : {doctordata.email}</p>
                <p className='text-white text-lg font-semibold'>mobile : {doctordata.phone}</p>
              </div>

              <div className='text-white'>
                <p className='underline text-xl font-bold'>Location</p>
                <p className='text-white text-lg font-semibold'>{doctordata.location}</p>
              </div>

              <div className='text-white'>
                <p className='underline text-xl font-bold'>Specialization</p>
                <p className='text-white text-lg font-semibold'>{doctordata.specialization.name}</p>
              </div>

              <div className='text-white'>
                <p className='underline text-xl font-bold'>Charges</p>
                <p className='text-white text-lg font-semibold'>{doctordata.amount}</p>
              </div>
              <div className='text-white'>
                <p className='underline text-xl font-bold'>About Me</p>
                <p className='text-white text-lg font-semibold'>{doctordata.about_me}</p>
              </div>
            </div>

            <div className='w-[40%] flex flex-col gap-5 mt-10 p-2 items-center'>
              {/* Calendar */}
              <div className='text-white text-center underline text-xl uppercase font-mono font-bold'>
                Book Your Appointment
              </div>
              <Calendar
                onClickDay={handleDateClick}  // Handle date click
                tileClassName={tileClassName} // Apply tile class for available days
                className= 'font-mono font-semibold text-lg p-2'
              />
               <p className='text-white'>* Green Color dates are available</p> 

              {/* Show available time slots */}
              {selectedDate && timeSlots && timeSlots.length > 0 && (
                <div className='mt-5 text-white flex flex-col gap-3  border-2 border-orange-900 p-5 m-2'>
                  <p className='text-xl font-bold underline'>Available Time Slots</p>
                  <form onSubmit = {onSubmitHandler} className='flex flex-col gap-3'>
                    {timeSlots.map((slot, index) => (
                      <div className='flex gap-2 items-center'>
                        <input onChange = {() => {set_start(slot.start_time) ; set_end(slot.end_time)} } type = 'radio' name = 'time_slots' id = 'time_slots' key={index} className={`text-lg font-semibold font-mono ${slot.booked ? 'line-through' : ''}`}>
                        </input>
                        <label> {slot.start_time} - {slot.end_time} </label>
                      </div>
                    ))}
                      <button type = 'submit' className='bg-yellow-500 text-black font-mono p-2 m-2 rounded-full transition-all duration-200  font-semibold hover:scale-90'>Book your Appointment </button>
                  </form>
                </div>
              )}
              {selectedDate && timeSlots.length === 0 && (
                <div className='mt-5 text-white'>
                  <p className='text-xl font-bold'>No Available Slots</p>
                </div>
              )}
            </div>
        </div>
        )
      }
    </div>
  );
};

export default Doctor;





// Handle date selection
//   const handleDateClick = (date) => {
//     const selectedDateStr = date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
//     const availableDay = availability.find((day) => day.date.toISOString().split('T')[0] === selectedDateStr);
    
//     if (availableDay) {
//       setSelectedDate(date);
//       setTimeSlots(availableDay.time_slots);  // Set time slots based on selected date
//     } else {
//       setSelectedDate(null);
//       setTimeSlots([]);
//     }
//   };

{/* {doctordata && (
        <div>
            {
                doctordata.availability.map( (av) => {
                    return (
                        <div>
                            {av.day}
                            {av.date}
                            {av.time_slots.map((st) => {
                                return (<>{st.start_time}</>)
                            })}
                        </div>
                    )
                })
            }
        </div>    
    )} */}





// import React, { useState , useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { doctor } from '../services/apis';
// import axios from 'axios';
// import {toast} from 'react-hot-toast';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// const Doctor = () => {
//   const {doctorId} = useParams();

//   const [doctordata,setdoctordata] = useState(null);
  
//   useEffect(() => {
//     const fetchdoctor = async () => {
//         try {
//             const response = await axios.post(doctor.getdoctorsbyid,{userId : doctorId});
//             if(!response.data.success) 
//             {
//                 throw new Error('not able to fetch data');
//             }else {
//                 setdoctordata(response.data.details);
//             }
//         }catch(error)
//         {
//             toast.error('Medisphere - serve down .. try gain later');
//         }
//     }
//     fetchdoctor();
//   },[doctorId]);

//   if(!doctordata)
//   {
//     return (
//         <div className='text-white'> Wait for data loading !!!</div>
//     )
//   }

//   return (
//     <div className='w-11/12 max-w-[1260px] mx-auto'>

//            {
//                 doctordata &&  ( 
//                 <div className='flex gap-10'>
//                     <div className='flex flex-col gap-14 mt-10 w-[60%] border-2 border-orange-900 p-2'>
//                                 <div className='text-white'>
//                                     <p className= 'text-xl underline font-bold'> Doctor Name </p>
//                                     <div className='text-lg flex items-center font-semibold gap-2'>
//                                         <p>{doctordata.first_name}</p>
//                                         <p>{doctordata.last_name}</p>
//                                     </div>
//                                 </div>

//                                 <div className='text-white'>
//                                     <p className='underline text-xl font-bold'>Contact Details</p>
//                                     <p className='text-white text-lg font-semibold'>email : {doctordata.email}</p>
//                                     <p className='text-white text-lg font-semibold'>mobile : {doctordata.phone}</p>
//                                 </div>

//                                 <div className='text-white'>
//                                     <p className='underline text-xl font-bold'>location</p>
//                                     <p className='text-white text-lg font-semibold'>{doctordata.location}</p>
//                                 </div>

//                                 <div className='text-white'>
//                                     <p className='underline text-xl font-bold'>Specialization</p>
//                                     <p className='text-white text-lg font-semibold'>{doctordata.specialization.name}</p>
//                                 </div>

//                                 <div className='text-white'>
//                                     <p className='underline text-xl font-bold'>About_Me</p>
//                                     <p className='text-white text-lg font-semibold'>{doctordata.about_me}</p>
//                                 </div>
//                     </div>

//                         <div className='w-[40%] flex flex-col gap-5 mt-10 p-2 items-center'>
//                                 {/* Calendar */}
//                                 <div className= 'text-white text-center underline text-xl uppercase font-mono font-bold'>
//                                     Book Your Appointment
//                                 </div>

//                                 <Calendar className= ' border-red-800 border-4' />
//                         </div>
//                 </div>)
//            }
//     </div>  
//   )
// }

// export default Doctor