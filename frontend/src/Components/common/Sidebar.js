import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { seteditData,seteditPermit } from '../../slices/editSlice';
import { IoMdMenu } from "react-icons/io";
const Sidebar = () => {
  const dispatch = useDispatch();  
  const {userData} = useSelector((state) => state.profile);

  const [sidebar_open,set_sidebar_open] = useState(true);  

  const clickHandler = () => {
    localStorage.setItem('editPermit',true) ; 
    dispatch(seteditPermit(true)) ; 
    localStorage.setItem('editData',JSON.stringify(userData)) ; 
    dispatch(seteditData(userData)) 
  }
  return (
    <div className=' text-black sidebar:w-[18%] w-[30%] font-semibold min-h-[100vh] font-mono relative'>
             <div className=' bg-yellow-500 text-white p-1 cursor-pointer w-fit absolute top-0 left-0 sidebar:invisible visible'>
                            {!sidebar_open && <IoMdMenu onClick={() => set_sidebar_open(true)}/> }
                            {sidebar_open && <span onClick={() => set_sidebar_open(false)}>X</span>}
            </div>
           { userData && sidebar_open && (
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
                                <div className= {`p-1 underline border-2 text-center overflow-auto`}>Add Availability time slots</div>
                            </Link>
                        )
                    }
                    
                   { 
                      userData.account_type !== "admin" && (
                            <div className='flex flex-col gap-8'>
                                <Link to= {'/dashboard/nextappointments'}>
                                    <div className= {`text-center p-1 underline border-2 overflow-auto`}>Next Appointments</div>
                                </Link>

                                <Link to= {'/dashboard/appointments_done'}>
                                    <div  className= {`text-center p-1 underline border-2 overflow-auto`}>Appointments done</div>
                                </Link>

                                <Link to= {'/dashboard/chats'}>
                                    <div className= {`text-center p-1 underline border-2`}>my chats</div>
                                </Link>
                            </div>
                      )                   
                    } 
                   { 
                      userData.account_type === "admin" && (
                            <div className='flex flex-col gap-8'>
                                <div>
                                    <Link to= {'/dashboard/addspecialization'}>
                                        <div className= {`text-center p-1 underline border-2 overflow-auto`}>Add Specialization </div>
                                    </Link>
                                </div>
                                
                                <div>
                                    <Link to= {'/dashboard/givepermission'}>
                                        <div className= {`text-center p-1 underline border-2 overflow-auto`}> Give Permission to doctors ? </div>
                                    </Link>
                                </div>
                            </div>
                      )                   
                    } 
                    
                </div>
            )
            
        }
    </div>
  )
}

export default Sidebar