import React from "react";
import AuthForm from "../../../../SharedComponents/Components/AuthForm/AuthForm";
import type { AuthField } from "../../../../SharedComponents/Components/AuthForm/AuthForm";
import { http } from "../../../../Services/Api/httpInstance";
import { Manager_URLS } from "../../../../Services/Api/ApisUrls";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
type RegisterForm = {
 userName: string;
  email: string;
  country : string;
  phoneNumber  : string;  
  profileImage?: FileList;
  password: string;
  confirmPassword:string;
};

export default function Register() {
  let navigate=useNavigate()



  const buildRegisterFormData = (data: RegisterForm) => {
  const fd = new FormData();
  fd.append("userName", data.userName);
  fd.append("email", data.email);
  fd.append("country", data.country);
  fd.append("phoneNumber", data.phoneNumber);
  fd.append("password", data.password);
  fd.append("confirmPassword", data.confirmPassword);

  const file = data.profileImage?.[0];
  if (file) fd.append("profileImage", file);

  return fd;
};
  const fields: AuthField<RegisterForm>[] = [
    {
      name: "userName",
      label: "userName",
      type: "text",
      placeholder: "Enter your userName",
      rules: { required: "userName is required" },
    },
    {
      name: "email",
      label: "email",
      type: "email",
      placeholder: "Enter your email",
      rules: { required: "email is required" },
    },
    {
      name: "country",
      label: "country",
      type: "text",
      placeholder: "Enter your country",
      rules: { required: "country is required" },
    },
    {
      name: "phoneNumber",
      label: "phoneNumber",
      type: "tel",
      placeholder: "Enter your phoneNumber",
      rules: {
        required: "phoneNumber is required",
        pattern: {
          value: /^[0-9+\s-]{8,20}$/,
          message: "Enter a valid mobile number",
        },
      },
    },
     {
      name: "profileImage",
      label: "profileImage",
      type: "text",
      placeholder: "Enter your Profile",
      rules: { required: "Profile is required",}},
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your Password",
      rules: { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } },
    },
     {
      name: "confirmPassword",
      label: "confirmPassword",
      type: "password",
      placeholder: "Enter your Password",
      rules: { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } },
    },
  ];

const onSubmit = async (data: RegisterForm) => {
   const fd = buildRegisterFormData(data);
  try {
    const res = await http.post(Manager_URLS.REGISTER, fd);

    toast.success("ٌRegister successful ✅");
    console.log(res.data);
    navigate('/dashboard')

  } catch (err) {
    const msg =
      axios.isAxiosError(err)
        ? err.response?.data?.message || "Login failed ❌"
        : "Something went wrong ❌";

    toast.error(msg);
    console.log(err);
  }
};

  return (
    <AuthForm<RegisterForm>
      title="Register"
      fields={fields}
      onSubmit={onSubmit}
      submitLabel="Register"
    />
  );
}