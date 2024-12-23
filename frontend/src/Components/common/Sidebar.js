import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { seteditData,seteditPermit } from '../../slices/editSlice';
const Sidebar = () => {
  const dispatch = useDispatch();  
  const {userData} = useSelector((state) => state.profile);
  const clickHandler = () => {
    localStorage.setItem('editPermit',true) ; 
    dispatch(seteditPermit(true)) ; 
    localStorage.setItem('editData',JSON.stringify(userData)) ; 
    dispatch(seteditData(userData)) 
  }
  return (
    <div className=' text-black w-[18%] font-semibold min-h-[100vh] font-mono'>
        {
            userData && (
                <div className='h-full p-2 flex flex-col gap-8 bg-red-200'>
                    
                    <Link to= {'/dashboard/myprofile'}>
                        <div className= {`text-center p-1 underline border-2`}>my Profile</div>
                    </Link>
                    
                    <Link to= {'/dashboard/editdetails'}>
                        <div  onClick={clickHandler}  className= {`text-center p-1 underline border-2`}>Edit Details</div>
                    </Link>

                    {
                        userData.account_type === "doctor" && (
                            <Link to = {'/dashboard/edit_time_slots'}>
                                <div className= {`text-center p-1 underline border-2`}>Edit Availability time slots</div>
                            </Link>
                        )
                    }
                    
                    <Link to= {'/dashboard/nextappointments'}>
                        <div className= {`text-center p-1 underline border-2`}>Next Appointments</div>
                    </Link>

                    <Link to= {'/dashboard/appointments_done'}>
                        <div  className= {`text-center p-1 underline border-2`}>Appointments done</div>
                    </Link>
                </div>
            )
        }
    </div>
  )
}

export default Sidebar