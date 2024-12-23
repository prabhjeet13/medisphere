import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useForm} from 'react-hook-form';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { editDoctorSlot ,deleteDoctorSlot} from '../services/db_functions';

const Edit_Time_Slots = () => {
  const {userData,token} = useSelector((state) => state.profile);
  const {register,handleSubmit} = useForm();
  const dispatch = useDispatch();
  
  
  const deleteHandler = async (date,day,start_time,end_time) =>  {
    const deleteslot = {
      date,
      day,
      start_time,
      end_time,
    }
    await deleteDoctorSlot(deleteslot,dispatch,token);
  }

  const submitHandler = async (data) => {
      await editDoctorSlot(data,dispatch,token);
  }


  return (
    <div className='w-[82%] text-white font-mono p-2 flex flex-col gap-5 m-2'>
        <p className='text-xl underline font-bold m-2'> Time Slots </p>    

        <form onSubmit = {handleSubmit(submitHandler)} className='p-3 border-2 border-orange-900 flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <label htmlFor='day'> Day </label>
                <input type ='text' id = 'day' name = 'day' className='rounded-md p-2 border-2 text-black'
                  {...register('day')} placeholder='Monday'
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label>Date</label>
                <input type ='text' id = 'date' name = 'date' className='rounded-md p-2 border-2 text-black'
                  {...register('date')} placeholder='YYYY-MM-DD'
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label>start_time</label>
                <input type ='text' id = 'start_time' name = 'start_time' className='rounded-md p-2 border-2 text-black'
                  {...register('start_time')} placeholder='00:00'
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label>end_time</label>
                <input type ='text' id = 'end_time' name = 'end_time' className='rounded-md p-2 border-2 text-black'
                  {...register('end_time')} placeholder='00:00'
                />
            </div>
            <button type = 'Submit' className='w-fit rounded-full p-2 m-1 text-black font-bold text-lg transition-all duration-200 hover:scale-90 bg-yellow-500'> Add Your Slot </button>
        </form>

        {
          userData.availability.map((avai,index) => {
            return(
              <>
              <details className='cursor-pointer flex flex-col'>
                    <summary className='bg-gray-300 text-black rounded-md p-2'>
                        <span> {index + 1 } : {avai.date} - {avai.day} </span>
                    </summary>
                    {
                       avai.time_slots.map( (slot) => {
                          return (
                            <div className='m-2 flex gap-8 items-center bg-gray-200 text-black p-2 rounded-md w-fit'>
                              <span> Start-Time : {slot.start_time}</span>
                              <span> End-Time : {slot.end_time}</span>
                              <span> Booked : {slot.booked === false ? "NO" : "YES"}</span>
                              <MdDeleteOutline onClick = { () => deleteHandler(avai.date,avai.day,slot.start_time,slot.end_time)} className='text-lg'/>
                            </div>
                          )
                       })
                    }
              </details>
              
              </>
            )
          })
        }  
    </div>
  )
}

export default Edit_Time_Slots