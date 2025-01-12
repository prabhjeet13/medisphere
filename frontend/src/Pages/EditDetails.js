import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-hot-toast';
import {useForm} from 'react-hook-form';
import {specialization} from '../services/apis';
import axios  from 'axios';
import { editAdmin, editDoctor,editPatient } from '../services/db_functions';
const EditDetails = () => {

  const {editPermit, editData} = useSelector((state) => state.edit);
  const {register,handleSubmit , setValue } = useForm();
  const [specialities,setSpecialities] = useState([]);
  const dispatch  = useDispatch();
  const {token} = useSelector((state) => state.profile);
  
  useEffect(() => {
      const fetch  = async () => {
        try {
          if(editPermit && editData)
            {
                // console.log(editPermit,'ffff' , editData);
                toast.success('Medisphere - you can edit your data ...');
                setValue('first_name',editData.first_name);
                setValue('last_name',editData.last_name);
                if(editData.account_type === "patient")
                {
                  setValue('phone',editData.phone);
                }
               if(editData.account_type === "doctor")
               {
                  setValue('phone',editData.phone);
                  setValue('about_me',editData.about_me);
                  setValue('amount',editData.amount);
                  setValue('license_no',editData.license_no);
                  setValue('location',editData.location);
                  setValue('specialization',editData.specialization.name);
                  setValue('bank_account_number',editData.bank_account_number);
                  setValue('ifsc_code',editData.ifsc_code);
                  const response = await axios.get(specialization.getall);
                  if(!response.data.success)
                  {
                    throw new Error('not able to do');
                  }else {
                    setSpecialities(response.data.details);
                  }
               }   
            }
        }catch(error) {
          toast.error('Medisphere - server down ...')
        }
      }
      fetch();
  },[editPermit,editData]);

  const submitHandler = async (data) => {
        if(editPermit) 
        {
              // to backend
              if(editData.account_type === "doctor")
              {
                    editDoctor(data,dispatch,token);
              }else if(editData.account_type === "patient"){
                    editPatient(data,dispatch,token);
              }else if(editData.account_type === "admin") {
                    editAdmin(data,dispatch,token);
              } 
        }
  }

  return (
    <div className='sidebar:w-[82%] w-full p-2 font-mono text-white flex flex-col gap-4'>
          <p className='text-xl font-bold underline'> Edit Details </p>
          <form onSubmit = {handleSubmit(submitHandler)} className='border-4 border-orange-800 flex flex-col gap-4 p-2 w-[90%]'>
                    
                <div className='flex flex-row gap-2 items-center'>
                        <div className='flex flex-col gap-1 w-[50%]'>
                          <label htmlFor='first_name' className='text-white'>
                              first_name
                          </label>
                          <input  type = 'text' id = 'first_name' name='first_name' placeholder='first_name' className='py-2 px-1 rounded-md  text-black bg-white border-2 border-black' required
                            { ...register('first_name') }
                          />
                        </div>
                      <div className='flex flex-col gap-1 w-[50%]'>
                          <label htmlFor='last_name' className='text-white'>
                              last_name
                          </label>
                          <input type = 'text' id = 'last_name' name='last_name' placeholder='last_name' className='py-2 rounded-md px-1 text-black bg-white border-2 border-black' required
                              { ...register('last_name') }
                          />
                      </div>
                </div>   

                {
                  editData && editData.account_type !== "admin" && (
                    <div className='flex flex-col'>
                            <label htmlFor='phone' className='text-white'> 
                                mobile
                            </label>
                            <input  type = 'text' id = 'phone' name = 'phone' placeholder='phone' className='border-2 border-black py-2 rounded-md px-3 text-black' required
                              { ...register('phone') }
                            />
                    </div>
                  )
                }

                {
                  editData && editData.account_type === "doctor" && (
                                      <>
                                      <div className='flex flex-col'>
                                        <label htmlFor='license_no' className='text-white'> 
                                            license_no
                                        </label>
                                        <input  type = 'text' id = 'license_no' name = 'license_no' placeholder='license_no' className='border-2 border-black py-2 rounded-md px-3 text-black' required
                                          { ...register('license_no') }
                                        />
                                      </div>

                                     <div className='flex gap-2 items-center'>
                                        <div className='w-[50%] flex flex-col gap-2'>                                        
                                          <label className='text-white'>Your Specialization that you saved</label>
                                          <input className='border-2 border-black py-2 rounded-md px-3 text-black' { ...register('specialization') } readOnly/>
                                        </div>
                                        <div className='w-[50%] flex flex-col gap-2'>
                                          <label htmlFor='specialization' className='text-white'> 
                                            specialization
                                          </label>
                                          <select  id = 'specialization' name = 'specialization' className='border-2 border-black py-2 rounded-md px-3 text-black'>
                                              <option> select your specialization </option>
                                            {
                                              specialities && specialities.map((sp) => {
                                                return (
                                                  <option key = {sp._id} value={sp._id}> {sp.name} </option>
                                                )
                                              })
                                            }
                                          </select>
                                          {/* <input onChange = {textboxvaluechange} value = {formData.specialization} type = 'text' id = 'specialization' name = 'specialization' placeholder='specialization' className='border-2 border-black py-2 rounded-md px-3 text-black' required/> */}
                                        </div>
                                      </div>    
                                        
                                      <div className='flex flex-col'>
                                        <label htmlFor='location' className='text-white'> 
                                            (clinic/hospital) location:
                                        </label>
                                        <input  type = 'text' id = 'location' name = 'location' placeholder='location' className='border-2 border-black py-2 rounded-md px-3 text-black' required
                                          { ...register('location') }
                                        />
                                       </div>
                                     
                                      <div className='flex flex-col'>
                                        <label htmlFor='amount' className='text-white'> 
                                          amount
                                        </label>
                                        <input  type = 'text' id = 'amount' name = 'amount' placeholder='amount' className='border-2 border-black py-2 rounded-md px-3 text-black' required
                                          { ...register('amount') }
                                        />
                                     </div>

                                      <div className='flex flex-col'>
                                        <label htmlFor='bank_account_number' className='text-white'> 
                                           bank_account_no
                                        </label>
                                        <input  type = 'text' id = 'bank_account_number' name = 'bank_account_number' placeholder='bank_account_number' className='border-2 border-black py-2 rounded-md px-3 text-black' required
                                          { ...register('bank_account_number') }
                                        />
                                     </div>

                                      <div className='flex flex-col'>
                                        <label htmlFor='ifsc_code' className='text-white'> 
                                           ifsc_code
                                        </label>
                                        <input  type = 'text' id = 'ifsc_code' name = 'ifsc_code' placeholder='ifsc_code' className='border-2 border-black py-2 rounded-md px-3 text-black' required
                                          { ...register('ifsc_code') }
                                        />
                                     </div>
                    
                                      <div className='flex flex-col'>
                                        <label htmlFor='amount' className='text-white'> 
                                          about me
                                        </label>
                                        <textarea rows = {5} cols = {5} type = 'text' id = 'about_me' name = 'about_me' placeholder='about_me' className='border-2 border-black py-2 rounded-md px-3 text-black' required
                                          { ...register('about_me') }
                                        />
                                     </div>
                                      </>
                  )
                }
                <button type = 'submit' className='bg-yellow-500 text-black text-lg font-mono font-bold rounded-full transition-all duration-200 hover:scale-90 p-2'>Edit Details</button>
          </form>
    </div>
  )
}

export default EditDetails
