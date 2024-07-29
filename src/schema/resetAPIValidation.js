import * as yup from "yup";

export const resetAPIValidation = yup.object().shape({
    resetReason: yup
      .string('Enter your reset reason')
      .required('State your reason'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });
