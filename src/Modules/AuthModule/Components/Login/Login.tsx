import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data:any) => {
    console.log(data);
  };

  return (
    <div className="auth-container">
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          <div className="bgtransparent rounded-3 m-1">
            <div className="form-container m-3">
              <div className="title-container">
                <p className="text-white mb-1">welcome to PMS</p>
                <h4 className="primary-color">Log In</h4>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* EMAIL */}
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
                      {errors.email.message}
                    </div>
                  )}
                </div>

                {/* PASSWORD */}
                <div className="auth-field">
                  <label className="auth-label" htmlFor="password">
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
                      {errors.password.message}
                    </div>
                  )}
                </div>

                {/* LINKS */}
                <div className="links d-flex justify-content-between mt-3">
                  <Link to="/register" className="text-white text-decoration-none">
                    Register Now
                  </Link>

                  <Link to="/forget-pass" className="text-white text-decoration-none">
                    Forget Password
                  </Link>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="btn primary-color-bg w-100 mt-4 rounded-5"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}