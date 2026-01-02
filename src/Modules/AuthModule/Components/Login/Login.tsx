<<<<<<< HEAD
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
=======
import React from "react";
import { http } from "../../../../Services/Api/httpInstance";
import AuthForm from "../../../../SharedComponents/Components/AuthForm/AuthForm";
import type { AuthField } from "../../../../SharedComponents/Components/AuthForm/AuthForm";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import validation from "../../../../Services/Validation";
>>>>>>> origin/dev
import { USERS_URL } from "../../../../Services/Api/ApisUrls";
import { http } from "../../../../Services/Api/httpInstance";
import validation from "../../../../Services/Validation";
import type { AuthField } from "../../../../SharedComponents/Components/AuthForm/AuthForm";
import AuthForm from "../../../../SharedComponents/Components/AuthForm/AuthForm";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
<<<<<<< HEAD

  const navigate=useNavigate()
=======
  let navigate = useNavigate();
>>>>>>> origin/dev
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

      toast.success("Login successful ✅");
      console.log(res.data);
      navigate("/dashboard");
    } catch (err) {
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.message || "Login failed ❌"
        : "Something went wrong ❌";

      toast.error(msg);
      console.log(err);
    }
  };

  return (
    <AuthForm<LoginForm>
      title="Login"
      fields={fields}
      onSubmit={onSubmit}
      submitLabel="Login"
<<<<<<< HEAD
      
=======
      footer={
        <div className="d-flex justify-content-between mt-3 ">
          <Link to="/auth/createaccount" className="text-decoration-none text-white">
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
>>>>>>> origin/dev
    />
  );
}
