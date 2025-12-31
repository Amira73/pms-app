import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {


   const {register, formState:{errors},handleSubmit}=useForm()
  const [showPassword, setShowPassword] = useState(false);
  return (
   <>
  <div className="auth-container">
    <div className="container-fluid">
      <div className="row  justify-content-center align-items-center">
        <div className=" bgtransparent rounded-3 m-3 ">

          <div className="form-container m-3 ">
  
    <div className="title-container">
       <p className=' text-white'>welcome to PMS</p>
      <h4 className='primary-color'>Log In</h4>
     
    </div>
<form >

<div className="mb-3">
  <label className="form-label text-white">Email</label>

   <input
    id="email"
    type="text"
    {...register("email", { required: "E-mail is required" })}
    className="form-control input-underline text-white"
    placeholder="Enter your E-mail"
  />

  {errors.email && (
    <div className="alert alert-danger mt-2 p-2">
      {errors.email.message}
    </div>
  )}
</div>

 {errors.email && <p className='alert alert-danger'>{errors?.email.message}</p>}


<div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon-password">
     <i className="fa-solid fa-lock"></i>
  </span>
   <input
    id="email"
    type="text"
    {...register("email", { required: "E-mail is required" })}
    className="form-control input-underline text-white"
    placeholder="Enter your E-mail"
  />
    <button
    type="button"
    className="input-group-text"
    onClick={() => setShowPassword((s) => !s)}
    aria-label={showPassword ? "Hide password" : "Show password"}
    style={{ cursor: "pointer" }}
  >
    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
  </button>
</div>
 {errors.password && <p className='alert alert-danger'>{errors?.password.message}</p>}
<div className="links d-flex justify-content-between m-2">
  <Link to='/register' className='text-white text-decoration-none'>Register Now</Link>
  <Link to='/forget-pass' className='text-white text-decoration-none'>Forget Password</Link>

</div>
<button type="submit" className="btn  primary-color-bg  w-100 m-auto rounded-5 ">
  Login
</button>


</form>
  





  
          </div>


        </div>
      </div>
    </div>
  </div>
</>
  )
}
