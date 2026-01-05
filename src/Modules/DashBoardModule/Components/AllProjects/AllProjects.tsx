import React, { useEffect, useState } from 'react'
import Header from '../../../../SharedComponents/Components/Header/Header'

import { http }  from "../../../../Services/Api/httpInstance.js";
import Buttono from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import nodata from ''
import DeleteConfirmation from '../../../../SharedComponents/Components/DeleteConfirmation/DeleteConfirmation.js';
import { USERS_URL } from '../../../../Services/Api/ApisUrls.js';
import axios from 'axios';
import {  getManagerProjectsFun } from './getManagerProjects.js';
import NoData from '../../../../SharedComponents/Components/NoData/NoData.js';
export default function AllProjects() {

type Project = {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  status?:string
    task: Task[];
 
};

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  modificationDate: string;
};
  const[projects ,setProectsList]=useState<Project[]>([]);

 useEffect(() => {
    async function load() {
      const res = await getManagerProjectsFun({ pageSize: 10, pageNumber: 1 });
      if (res) {
         setProectsList(res?.data ?? []);
      }
    }
    load();
  }, []);

  return (
    <>
   {/* <Buttono variant="primary" onClick={handleShow}>
        Launch demo modal
      </Buttono> */}

      {/* <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
       <DeleteConfirmation deleteItem="project " name={catName}></DeleteConfirmation>
        <Modal.Footer>
          
          <Buttono variant="outline-danger"onClick={handleDelete} >
           Delete This item
          </Buttono>
        </Modal.Footer>
      </Modal>




       <Modal show={show2} onHide={handleClose2} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add project</Modal.Title>
        </Modal.Header> */}


        {/* <form onSubmit={handleSubmit(Addproject)}> */}

{/* <div class="input-group m-5 w-75 m-auto">
  
  <input type="text" 
  
  {...register('name' ,{
   required:" name is required",
  //  pattern: {
  //                           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  //                           message: "Enter a valid email address",
  //                         },

  })}
  className="form-control text-color" placeholder="Enter A project" aria-label="Username" aria-describedby="basic-addon1"/>
</div>
 {errors.name && <p className='alert alert-danger'>{errors?.name.message}</p>}

    
        <Modal.Footer>
          
          <Buttono  type='submit' className="m-3" variant="success">
           {modalMode === "add" ? "Save" : "Update"}
          </Buttono>
        </Modal.Footer>
         </form>
      </Modal> */}
   
     <Header title="projects" description="You can now add your items that any user can order it from the Application and you can edit" imgUrl={headerImg}></Header>
       <div className="d-flex justify-content-between align-items-center m-3">
  {/* Left side */}
  <div>
    <h5 className="mb-0">projects Table Details</h5>
    <small className="text-muted">You can check all details</small>
  </div>

  {/* Right side */}
  <div className="text-end">
    <button className="btn btn-success btn-bg{ mb-1" onClick={()=>{}}>
      Add New project
    </button>
   
  </div>
</div>



           <div className="table-container table-responsive  m-1">
      <table className="table   table-striped  table-custom">
  <thead className='' >
    <tr className='table-header-row'>
     
      
              <th>Title</th>
              
                    <th>Status</th>
                        <th>Num Users</th>
                            <th>Num Taska</th>
              <th>Data Created</th>
             
    </tr>
  </thead>
  <tbody>
   { projects.length > 0 ? projects.map((project, idx)=>  
       <tr key={ project.id || idx}>
      
      <td>{project.title}</td>
      <td>Public</td>
      <td>2</td>
       <td>{project.task.length}</td>
        <td>{project.creationDate}</td>

      <td>
      <div className="dropdown">
    <button
      className="btn btn-link p-0 text-dark"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
     <i className="fa-solid fa-ellipsis"></i>
    </button>

    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <button className="dropdown-item primary-color" onClick={() => console.log("View")}>
          <i className="fa-regular fa-eye me-2"></i> View
        </button>
      </li>
      <li>
        <button className="dropdown-item primary-color" onClick={() => console.log("View")}>
          <i className="fa-regular fa-pen-to-square me-2"></i> Edit
        </button>
      </li>
     
      <li>
        <button className="dropdown-item primary-color"  onClick={() => console.log("View")}>
          <i className="fa-regular fa-trash-can me-2"></i> Delete
        </button>
      </li>
    </ul>
  </div>
      </td>
    </tr>):<NoData/>}
  
    
  </tbody>
</table>


 {/* <div className="d-flex gap-2 mt-3 justify-content-center">
          <button
            className="btn btn-outline-secondary"
            disabled={pageNumber === 1}
            onClick={() => setPageNumber((p) => p - 1)}
          >
            Prev
          </button>

          <span className="align-self-center">Page {pageNumber}</span>

          <button
            className="btn btn-outline-secondary"
            onClick={() => setPageNumber((p) => p + 1)}
          >
            Next
          </button>
        </div> */}
    </div>
          </>
  )
}

