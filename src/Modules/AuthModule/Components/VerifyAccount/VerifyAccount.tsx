import React from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
export default function VerifyAccount() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="auth-container">
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          <div className="bgtransparent rounded-3 m-1">
            <div className="form-container m-3">
              <div className="title-container  mb-4">
                <p className="text-white mb-1">welcome to PMS</p>
                <h4 className="primary-color mb-1">Verify Account</h4>
                <hr
                  className=" ms-0 mt-0"
                  style={{
                    width: "15px", // العرض اللي أنت محتاجه
                    height: "3px", // السُمك
                    backgroundColor: "#f3a21b", // اللون الأصفر بتاعك
                    border: "none",
                    opacity: 1,
                  }}
                />{" "}
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* 1. EMAIL */}
                <div className="auth-field mb-3">
                  <label className="auth-label text-white" htmlFor="email">
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
                    <div className="text-danger mt-1 small">
                      {String(errors.email.message)}
                    </div>
                  )}
                </div>

                {/* 2. OTP */}
                <div className="auth-field mb-3">
                  <label className="auth-label text-white" htmlFor="otp">
                    OTP Verification
                  </label>
                  <Form.Control
                    id="otp"
                    type="text"
                    className="auth-input"
                    placeholder="Enter Verification"
                    {...register("otp", { required: "OTP is required" })}
                  />
                  {errors.otp && (
                    <div className="text-danger mt-1 small">
                      {String(errors.otp.message)}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn primary-color-bg w-100 mt-4 rounded-5 text-white"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
