import React from 'react'
import { useSelector } from 'react-redux'

const MyProfile = () => {

  const {userData} = useSelector((state) => state.profile);

  if(!userData)
  {
    return (
      <div> No Data found !</div>
    )
  }


  return (
    <div className='w-[82%] p-2 font-mono text-white flex flex-col gap-4'>
      <p className='font-bold text-xl underline'>
          My Profile
      </p>
      
      <div className='text-white'>
                <p className='text-xl underline font-bold'>{ userData.account_type === "doctor" ? "Doctor Name" : "Patient Name"} </p>
                <div className='text-lg flex items-center font-semibold gap-2'>
                  <p>{userData.first_name}</p>
                  <p>{userData.last_name}</p>
                </div>
      </div>

      <div className='text-white'>
                <p className='underline text-xl font-bold'>Contact Details</p>
                <p className='text-white text-lg font-semibold'>email : {userData.email}</p>
                { userData.account_type !== "admin" && <p className='text-white text-lg font-semibold'>mobile : {userData.phone} </p> }
      </div>

        {userData.account_type === "doctor" && (<>
            <div className='text-white'>
                  <p className='underline text-xl font-bold'>Location</p>
                  <p className='text-white text-lg font-semibold'>{userData.location}</p>
          </div>

          <div className='text-white'>
                  <p className='underline text-xl font-bold'>Specialization</p>
                  <p className='text-white text-lg font-semibold'>{userData.specialization.name}</p>
          </div>

          <div className='text-white'>
                  <p className='underline text-xl font-bold'>Charges</p>
                  <p className='text-white text-lg font-semibold'>{userData.amount}</p>
          </div>
          <div className='text-white'>
                  <p className='underline text-xl font-bold'>Bank_account_number</p>
                  <p className='text-white text-lg font-semibold'>{userData.bank_account_number}</p>
          </div>
          <div className='text-white'>
                  <p className='underline text-xl font-bold'>Ifsc_code</p>
                  <p className='text-white text-lg font-semibold'>{userData.ifsc_code}</p>
          </div>
          <div className='text-white'>
                  <p className='underline text-xl font-bold'>About Me</p>
                  <p className='text-white text-lg font-semibold'>{userData.about_me}</p>
          </div>
        </>)}
      </div>
  )
}

export default MyProfile