import * as yup from "yup";


export const inviteTeamValidation = yup.object().shape({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    roles: yup
      .string('Select your role')
      .required('Role is required'),
    assignTo: yup
      .string('Assign your role')
      .required('Assign Role is required'),
  });