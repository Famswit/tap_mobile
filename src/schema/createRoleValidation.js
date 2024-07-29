import * as yup from "yup";


export const createRoleValidation = yup.object().shape({
    
    roleName: yup
      .string('enter your role')
      .required('Role name is required'),
    
  });