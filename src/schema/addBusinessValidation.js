import * as yup from "yup";

 export const addBusinessValidation = yup.object().shape({
    name: yup
      .string('Enter your name')
      .min(1, 'Too Short!')
      .required('Business name is required'),
      category: yup
      .string('Enter the business category')
      .required('Business category is required'),
      address: yup
      .string('Enter your business address')
      .min(5, 'address should be of minimum 5 characters length')
      .required('Business address is required'),
      contactName: yup
      .string('Enter your Contact Name')
      .min(1, 'Too Short!')
      .max(50, 'Too Long!')  
      .required('Contact name is required'),
      contactEmail: yup
      .string('Enter your password')
      .email('Enter a valid email')
      .required('Email is required'),
      contactPhone: yup
      .string('Enter your Contact Number')
      .min(11, 'Contact Number should be of minimum 11 characters length')
      .required('Contact number is required'),
     
  });

  