import * as yup from "yup";

 export const changePasswordValidation = yup.object().shape({
    currentPassword: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),

      newPassword: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),

      confirmPassword: yup.string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });