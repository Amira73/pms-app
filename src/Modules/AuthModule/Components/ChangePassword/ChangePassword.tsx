import { http } from "../../../../Services/Api/httpInstance";
import AuthForm from "../../../../SharedComponents/Components/AuthForm/AuthForm";
import type { AuthField } from "../../../../SharedComponents/Components/AuthForm/AuthForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import validation, {
  getRequiredMessage,
} from "../../../../Services/Validation";
import { baseURL, USERS_URL } from "../../../../Services/Api/ApisUrls";

type ChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
export default function ChangePassword() {
  let navigate = useNavigate();

  const fields: AuthField<ChangePasswordForm>[] = [
    {
      name: "oldPassword",
      label: "old Password",
      type: "password",
      placeholder: "Enter your old Password ",
      rules: {
        required: validation.PASSWORD_VALIDATION(
          getRequiredMessage("oldPassword")
        ).required,
      },
    },
    {
      name: "newPassword",
      label: "new Password",
      type: "password",
      placeholder: "Enter your new Password",
      rules: {
        required: validation.PASSWORD_VALIDATION(
          getRequiredMessage("newPassword")
        ).required,
      },
    },
    {
      name: "confirmNewPassword",
      label: "confirm New Password",
      type: "password",
      placeholder: "Enter your confirm New Password",
      rules: {
        required: validation.PASSWORD_VALIDATION(
          getRequiredMessage("confirmNewPassword")
        ).required,
      },
    },
  ];
  const onSubmit = async (data: ChangePasswordForm) => {
    try {
      const res = await http.put(USERS_URL.CHANGE_PASSWORD, data);

      toast.success("ChangePassword successful ✅");
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
    <AuthForm<ChangePasswordForm>
      title="Change Password"
      fields={fields}
      onSubmit={onSubmit}
      submitLabel="Change"
    />
  );
}
