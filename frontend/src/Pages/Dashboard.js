import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/common/Sidebar'
const Dashboard = () => {
    
    
  
    return (
    <div className='w-11/12 max-w-[1260px] mx-auto flex gap-2 border-2 border-red-600'>
        {/* left side */}
        <Sidebar/>
        {/* right side */}
        <Outlet/>
    </div>
  )
}

export default Dashboard