import React, { useEffect ,useState} from 'react'
import { doctor } from '../services/apis';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { specialization } from '../services/apis';
import { useNavigate } from 'react-router-dom';
const AllDoctors = () => {

  const [doctors,setdoctors] = useState([]);
  useEffect(() => {
    const fetchdoctors = async () => {
        try {
            const response = await axios.get(doctor.getalldoctorsactive);
            if(!response.data.success)
            {
                throw new Error('try again later');
            }else {
                setdoctors(response.data.details);
            }
           }catch(error) {
                toast.error('Medisphere- server down - try again later');
           }  
      }
    fetchdoctors();
  },[])

  const [specialities,setspecialities] = useState([]);  
  useEffect( () => {
    const fetchsp = async () => {
      try {
        const response = await axios.get(specialization.getall);
        if(!response.data.success)
        {
            throw new Error("try again later");
        }else {
          setspecialities(response.data.details);
        }
      }catch(error) {
        toast.error('Medisphere - server down .. try again');
      }
    }
    fetchsp();
  },[]);

  const handleSpecialityChange = (e) => {
    if(e.target.value !== "select your specialization")
    {
        // alert('hello');
        navigate(`/doctors/${e.target.value}`);
    }
  }

  const navigate = useNavigate();

  if(doctors.length == 0)
  {
     return (<div>No Doctors found !!! </div>)
  }


  return (
    <div className='w-11/12 max-w-[1260px] mx-auto flex flex-col gap-5'>
            <p className='text-3xl text-left font-mono uppercase font-bold text-white underline'>
                Doctors
            </p>

            
            <div className='flex flex-col gap-2'>
                        <select onChange={handleSpecialityChange} id = 'specialization' name = 'specialization' className='border-2 border-black py-2 rounded-md px-3 text-black'>
                                     <option value={"select your specialization"}> select your specialization </option>
                                  {
                                     specialities && specialities.map( (sp) => {
                                      return (
                                        <option value={sp.name} key = {sp._id}> {sp.name} </option>
                                      )
                                     })
                                  }
                        </select>
                                {/* <input onChange = {textboxvaluechange} value = {formData.specialization} type = 'text' id = 'specialization' name = 'specialization' placeholder='specialization' className='border-2 border-black py-2 rounded-md px-3 text-black' required/> */}
                </div>
            
            
            {/* specialitions */}

            <div className='doctor-div:grid doctor-div:grid-cols-3 w-full gap-2 mt-2 p-5 grid-cols-1'>
                {
                    doctors.length > 0 && (
                        doctors.map( (doctor) => {
                            return (
                        <>
                            <div onClick = {( () => navigate(`/doctor/${doctor._id}`))} key={doctor._id} className='bg-gradient-to-l from-pink-300  to-white w-fit flex flex-col items-start gap-2 font-mono border-2 text-black font-semibold bg-white h-fit cursor-pointer rounded-md p-2 m-2 transition-all duration-200 hover:scale-90'>
                                    <div className='flex gap-2 items-center'>
                                        <span>Name: </span>
                                        <span> {doctor.first_name} </span>
                                        <span> {doctor.last_name} </span>
                                    </div>
                                    <p>
                                        <span>email: </span>
                                        {doctor.email}
                                    </p>
                                    <p>
                                        <span> mobile: </span>
                                        {doctor.phone}
                                    </p>
                                    <p> 
                                        <span> speciality: </span>
                                        {doctor.specialization.name}
                                    </p>
                                    <p> 
                                        <span> license_no: </span>
                                        {doctor.license_no}
                                    </p>
                                    <p> <span> charges: </span>
                                        {doctor.amount}
                                    </p>
                                    <p> <span> location: </span>
                                        {doctor.location}
                                    </p>
                            </div>    
                        </>
                            )
                            
                            
                        })
                    )
                }
            </div>
    </div>
  )
}

export default AllDoctors