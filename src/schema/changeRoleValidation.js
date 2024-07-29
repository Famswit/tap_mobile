import * as yup from "yup";


export const changeRoleValidation = yup.object().shape({
    
    roles: yup
      .string('enter your new role')
      .required('New role name is required'),
    
  });