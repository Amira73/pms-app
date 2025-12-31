import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import Sidebar from '../SideBar/Sidebar'

export default function MasterLayout() {
  return (
   <>
   <div className="d-flex vh-100 bg-danger">
    <div className="">
        <Sidebar/>

    </div>


      <div className="w-100 bg-info">
        <NavBar/>
        <Outlet/>

    </div>



   </div>
   </>
   
  )
}
