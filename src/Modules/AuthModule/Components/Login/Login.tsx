import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { http } from "../../../../Services/Api/httpInstance";
import { USERS_URL } from "../../../../Services/Api/ApisUrls";
import validation from "../../../../Services/Validation";
import axios from "axios";
import type { AuthField } from "../../../../SharedComponents/Components/AuthForm/AuthForm";
import AuthForm from "../../../../SharedComponents/Components/AuthForm/AuthForm";
import { useAuth } from "../../../../Context/AuthContext";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  let navigate = useNavigate();
  const { savaLoginData, loginData, isAuthenticated } = useAuth();

  const fields: AuthField<LoginForm>[] = [
    {
      name: "email",
      label: "E-mail",
      type: "email",
      placeholder: "Enter your E-mail",
      rules: { required: validation.EMAIL_VALIDATION.required },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your Password",
      rules: { required: "Password is required" },
    },
  ];

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await http.post(USERS_URL.LOGIN, data);

      toast.success("Login successful ");
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      console.log(res.data.token);
      savaLoginData();
      navigate("/dashboard");
    } catch (err) {
      console.log("error", err);
      toast.error("Something went wrong ");
    }
  };

  return (
    <AuthForm<LoginForm>
      title="Login"
      fields={fields}
      onSubmit={onSubmit}
      submitLabel="Login"
      footer={
        <div className="d-flex justify-content-between mt-3 ">
          <Link
            to="/auth/createaccount"
            className="text-decoration-none text-white"
          >
            Register Now ?
          </Link>

          <Link
            to="/auth/forget-password"
            className="text-decoration-none text-white"
          >
            Forget password?
          </Link>
        </div>
      }
    />
  );
}
