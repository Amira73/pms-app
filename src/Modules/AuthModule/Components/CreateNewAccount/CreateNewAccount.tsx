import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { InputGroup } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import { http } from "../../../../Services/Api/httpInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validation from "../../../../Services/Validation";
import { USERS_URL } from "../../../../Services/Api/ApisUrls";

export default function CreateNewAccount() {

    let navigate = useNavigate();

    const {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm();

    const onSubmit = async (data:any) => {
        try {
            const response = await http.post(USERS_URL.CREATE, data);
            console.log(response);
            toast.success('Login Successful',{theme:'colored'});

            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error("Failed to register",{theme:'colored'});
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);


  return (
    <div className="auth-container">
          <div className="container-fluid z-3">
            <div className="row justify-content-center align-items-center">
              <div className="bgtransparentCreate rounded-3 m-1">
                <div className="form-container m-3">
                  <div className="title-container">
                    <p className="text-white mb-1">welcome to PMS</p>
                    <h4 className="primary-color">Create New Account</h4>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="auth-field">
                      <label className="auth-label" htmlFor="email">
                        User Name
                      </label>
    
                      <Form.Control
                        id="userName"
                        type="text"
                        className="auth-input"
                        placeholder="Enter your name"
                        {...register("userName", { required: "Name is required"})}
                      />
    
                      {errors.userName && (
                        <div className="alert alert-danger mt-2 p-2">
                          {errors.userName.message?.toString()}
                        </div>
                      )}
                    </div>
                    <div className="auth-field">
                      <label className="auth-label" htmlFor="email">
                        Country 
                      </label>
    
                      <Form.Control
                        id="country "
                        type="text"
                        className="auth-input"
                        placeholder="Enter your Country "
                        {...register("country", { required: "Country  is required" })}
                      />
    
                      {errors.country  && (
                        <div className="alert alert-danger mt-2 p-2">
                          {errors.country.message?.toString()}
                        </div>
                      )}
                    </div>
                    <div className="auth-field">
                      <label className="auth-label" htmlFor="email">
                        Password
                      </label>
    
                      <InputGroup className="auth-inputgroup">
                    <Form.Control
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="auth-input"
                      placeholder="Enter your Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />

                    <InputGroup.Text
                        as="button"
                        type="button"
                        className="auth-eye-btn"
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        <i
                          className={`fa-solid ${
                            showPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                        />
                      </InputGroup.Text>
                    </InputGroup>
    
                      {errors.password && (
                        <div className="alert alert-danger mt-2 p-2">
                          {errors.password.message?.toString()}
                        </div>
                      )}
                    </div>
                        </div>
                  <div className='col-md-6'>
                            <div className="auth-field">
                              <label className="auth-label" htmlFor="email">
                                Email
                              </label>
            
                              <Form.Control
                                id="email"
                                type="text"
                                className="auth-input"
                                placeholder="Enter your E-mail"
                                {...register("email", { required: "E-mail is required" })}
                              />
            
                              {errors.email && (
                                <div className="alert alert-danger mt-2 p-2">
                                  {errors.email.message?.toString()}
                                </div>
                              )}
                    </div><div className="auth-field">
                      <label className="auth-label" htmlFor="email">
                        Phone Number
                      </label>
    
                      <Form.Control
                        id="phoneNumber"
                        type="text"
                        className="auth-input"
                        placeholder="Enter your Phone Number "
                        {...register("phoneNumber", { required: "Phone Number  is required" })}
                      />
    
                      {errors.phoneNumber && (
                        <div className="alert alert-danger mt-2 p-2">
                          {errors.phoneNumber.message?.toString()}
                        </div>
                      )}
                    </div><div className="auth-field">
                      <label className="auth-label" htmlFor="email">
                        Confirm Password
                      </label>
    
                       <InputGroup className="auth-inputgroup">
                          <Form.Control
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            className="auth-input"
                            placeholder="Enter your Password"
                            {...register("confirmPassword", {
                              required: "Confirm Password  is required",
                            })}
                          />

                    <InputGroup.Text
                          as="button"
                          type="button"
                          className="auth-eye-btn"
                          onClick={() => setConfirmPassword((s) => !s)}
                          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                          <i
                            className={`fa-solid ${
                              showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                            }`}
                          />
                        </InputGroup.Text>
                      </InputGroup>
    
                      {errors.confirmPassword  && (
                        <div className="alert alert-danger mt-2 p-2">
                          {errors.confirmPassword.message?.toString()}
                        </div>
                      )}
                    </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn primary-color-bg w-50 mt-4 rounded-5 d-block mx-auto"
                        >
                        Save
                        </button>

                  </form>
                  
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}
