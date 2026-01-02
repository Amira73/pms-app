import { useState } from "react";
import type { AuthField } from "../../../../SharedComponents/Components/AuthForm/AuthForm";
import AuthForm from "../../../../SharedComponents/Components/AuthForm/AuthForm";

type VerifyAccountForm = {
  email: string;
  seed: string; // غير otp إلى seed
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const [loading] = useState(false);

  const onSubmit = (data: VerifyAccountForm) => {
    // TODO: implement verification logic
    console.log("VerifyAccount submit", data);
  };

  const fields: AuthField<VerifyAccountForm>[] = [
    {
      name: "email",
      label: "E-mail",
      type: "email",
      placeholder: "Enter your E-mail",
      rules: {
        required: "Email is required",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Please enter a valid email address",
        },
      },
    },
    {
      name: "seed",
      label: "OTP Code",
      type: "text",
      placeholder: "Enter OTP Code",
      rules: {
        required: "OTP code is required",
        pattern: {
          value: /^[0-9]+$/,
          message: "OTP must contain only numbers",
        },
      },
    },
  ];

  return (
    <AuthForm<VerifyAccountForm>
      title="Verify Account"
      subtitle="Reset your account password"
      fields={fields}
      onSubmit={onSubmit}
      submitLabel="Save"
      loading={loading}
    />
  );
}
