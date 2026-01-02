import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { USERS_URL } from "../../../../Services/Api/ApisUrls";
import { http } from "../../../../Services/Api/httpInstance";
import validation from "../../../../Services/Validation";
import type { AuthField } from "../../../../SharedComponents/Components/AuthForm/AuthForm";
import AuthForm from "../../../../SharedComponents/Components/AuthForm/AuthForm";

type ForgetPasswordForm = {
  email: string;
  password: string;
};
export default function ForgetPassword() {
  const navigate = useNavigate();
  const fields: AuthField<ForgetPasswordForm>[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your E-mail",
      rules: { required: validation.EMAIL_VALIDATION.required },
    },
  ];

  const onSubmit = async (data: ForgetPasswordForm) => {
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
    <AuthForm<ForgetPasswordForm>
      title="Forget Password"
      fields={fields}
      onSubmit={onSubmit}
      submitLabel="Verify"
    />
  );
}
