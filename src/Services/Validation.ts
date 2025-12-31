
export const getRequiredMessage = (fieldName:String) => `${fieldName} is required`;

// Email Validation using regex
export const EmailValidation = {
  required: getRequiredMessage("Email"),
  pattern: {
    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    message: "Email is not valid",
  },
};

// Password Validation using regex
const PasswordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{}|\\:;"'<>,.?/-]).{6,}$/;

export const PasswordValidation = {
  required: getRequiredMessage("Password"),
  pattern: {
    value: PasswordRegEx,
    message: "At least 6 characters: UPPER/lowercase, numbers, and special characters",
  },
};