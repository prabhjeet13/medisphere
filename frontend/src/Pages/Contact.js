import React from 'react'

const Contact = () => {
  return (
    <div className='mx-auto w-11/12 max-w-[1260px] flex-col'>
        <p className='font-bold font-mono text-lg text-white text-center m-3'>Reach out to us—your health, our priority!</p>
        <form className='mx-auto w-fit flex-col border-4 border-orange-900 p-5 m-4'>
            
            <div className='mt-2'>
                <label className='font-mono text-white text-lg'> Name </label>
                <input className='rounded-md p-2  text-black w-full'/>
            </div>
            <div className='mt-2'>
                <label className='font-mono text-white text-lg'> Email </label>
                <input className='rounded-md p-2  text-black w-full'/>
            </div>
            <div className='mt-2'>
                <label className='font-mono text-white text-lg'> Message </label>
                <textarea rows={5} cols={20} className='rounded-md p-2  text-black w-full'/>
        <input type = 'submit' className='bg-yellow-500 text-black font-bold rounded-full p-2 m-2 cursor-pointer transition-all duration-200 hover:scale-90'/>
            </div>
        </form>
    </div>
  )
}

export default Contact