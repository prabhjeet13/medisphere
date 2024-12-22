import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
const Sidebar = () => {
    
  const {userData} = useSelector((state) => state.profile); 
  return (
    <div className=' text-black w-[18%] font-semibold min-h-[100vh] font-mono'>
        {
            userData.account_type === "doctor" && (
                <div className='h-full p-2 flex flex-col gap-8 bg-red-200'>
                    <Link>
                        <div className='text-center p-1 underline border-2'>my Profile</div>
                    </Link>
                    
                    <Link>
                        <div className=' text-center p-1 underline border-2'>Edit Details</div>
                    </Link>

                    <Link>
                        <div className=' text-center p-1 underline border-2'>Edit Availability time slots</div>
                    </Link>
                    
                    <Link>
                        <div className=' text-center p-1 underline border-2'>Next Appointments</div>
                    </Link>

                    <Link>
                        <div className=' text-center p-1 underline border-2 text-black bg-yellow-500'>Appointments done</div>
                    </Link>
                </div>
            )
        }

        {
            userData.account_type === "patient" && (
                <></>
            )
        }
    </div>
  )
}

export default Sidebar