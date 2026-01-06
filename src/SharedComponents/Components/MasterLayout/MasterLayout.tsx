import React from 'react'
import NavBar from '../NavBar/Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from '../SideBar/Sidebar'

export default function MasterLayout() {
  return (
   <>
   <div className="d-flex vh-100 ">
    <div className="">
        <Sidebar/>

    </div>


      <div className="w-100  ">
        <NavBar/>
        <Outlet/>

    </div>



   </div>
   </>
   
  )
}
