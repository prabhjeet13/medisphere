import React, { useEffect , useState } from 'react'
import toast from 'react-hot-toast';
import { specialization } from '../services/apis';
import axios from 'axios';
import { useSelector } from 'react-redux';
const AddSpecialization = () => {
 
  const [formData,setFormData] = useState({
       name: "",
       description : "",   
  });

  const {token} = useSelector((state) => state.profile);

  const textboxvaluechange = (e) => {
    setFormData( (prev) => ({
      ...prev,
      [e.target.name] : e.target.value,
    })
  )}

  const submitHandler = async (e) => {
    e.preventDefault();
    const tid = toast.loading('wait ...');
      try {
            const response = await axios.post(specialization.add,{...formData,token});

            if(!response.data.success)
            {
               throw new Error('do again');
            }else {
              toast.success('done');
            }
      }catch(error)
      {
        toast.error(' Medisphere - try again later');
      }
      toast.dismiss(tid);
  }


  return (
    <div className='w-[82%] p-2 m-2 font-mono'>
          <p className='text-xl text-white font-bold underline'>Add Specialization</p> 
          <form onSubmit = {submitHandler} className='p-2 m-2 border-2 border-red-400 gap-4 flex flex-col'>
                    <div className='flex flex-col gap-2'>
                          <label htmlFor='name'> Name: </label>
                          <input onChange = {textboxvaluechange} className='text-black p-2 rounded-md' value={formData.name} id = 'name' name = 'name'  type = 'text' placeholder='name'/>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='description'> Description: </label>
                        <input onChange = {textboxvaluechange} className = 'text-black p-2 rounded-md' type = 'text' name = 'description' id = 'description' value = {formData.description} placeholder='description' />
                    </div>

                    <button type='submit' className='text-black bg-yellow-500 p-2 rounded-full font-bold w-fit transition-all duration-200 hover:scale-90'> Save </button>
          </form>
    </div>
  )
}

export default AddSpecialization