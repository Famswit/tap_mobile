import * as React from "react";
import { Typography, Box, Button as MuiButton, styled } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";

import { TextInput } from "../../../../components/TextInput";
import { Modal } from "../../../../components/Modal";
import { addBusinessValidation } from "schema/addBusinessValidation";
import { useCreateBusiness } from "api/business";

const AddButton = styled(MuiButton)({
  marginTop: "35px",
  width: "344px",
  height: "48px",
  backgroundColor: "#3f50b5",
  textAlign: "center",
  "&:hover": {
    backgroundColor: "#2D75B6",
  },
});

export function AddBusiness() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiIwYjI5ZmVhYy1jODE0LTQ3ODItODRlZi1iN2NmMThiYzZkZTUiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsIm9uZVRpbWVMb2dpbktleSI6Ijg4NDUzODM0MDEiLCJwZXJtaXNzaW9uc05hbWUiOlt7Im5hbWUiOiJNQU5BR0VfU0VUVElOR1MifSx7Im5hbWUiOiJWSUVXX1JPTEVTIn0seyJuYW1lIjoiRVhQT1JUX0JVU0lORVNTRVMifSx7Im5hbWUiOiJWSUVXX0JVU0lORVNTRVMifSx7Im5hbWUiOiJWSUVXX1RSQU5TQUNUSU9OUyJ9LHsibmFtZSI6IkVYUE9SVF9BQ1RJVklUSUVTIn0seyJuYW1lIjoiTUFOQUdFX0JVU0lORVNTRVMifSx7Im5hbWUiOiJNQU5BR0VfUk9MRVMifSx7Im5hbWUiOiJCVVNJTkVTU0VTX1dBTExFVF9UT1BVUCJ9LHsibmFtZSI6Ik1BTkFHRV9URUFNUyJ9LHsibmFtZSI6IlZJRVdfQUNUSVZJVElFUyJ9LHsibmFtZSI6IlZJRVdfVEVBTVMifSx7Im5hbWUiOiJFWFBPUlRfVFJBTlNBQ1RJT05TIn1dLCJpYXQiOjE3MTQ3Mjg0NTUsImV4cCI6MTcxNDgxNDg1NX0.0P-q-SRRVKxhWhzEVcta3E7KkEIX60pUTkTm5aw4TD4"
  const { mutate, isPending } = useCreateBusiness(token);
  const { enqueueSnackbar } = useSnackbar();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        category: "",
        address:"",
        contactName:"",
        contactEmail:"",
        contactPhone:"",
      },
      validationSchema: addBusinessValidation,

      onSubmit: (values) => {
        mutate(
          { data: { 
            name: values.name, 
            category: values.category,
            address: values.address,
            contactName: values.contactName,
            contactEmail: values.contactEmail,
            contactPhone: values.contactPhone,
          } },
          {
            onError: (err) => {
              console.log({ err });
            },
            onSuccess: (res) => {
              if (res.status !== "error") {
                sessionStorage.getItem('token', res.data.token);
                enqueueSnackbar("Login Successful", { variant: "success" });
              } else {
                enqueueSnackbar(res.message, { variant: "error" });
              }
            },
          }
        );
      },
    });
 
  return (
    <div>
      <AddButton
        onClick={handleOpen}  
        sx={{ width: "169px", height: "48px" }}
        variant="contained"
      >
        Add new Business
      </AddButton>

      <Modal open={open} handleClose={handleClose}>
        <Box sx={{width:'412px', height:'655px', overflow:'auto'}}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontStyle: "normal", 
            }}
          >
            Add new business
          </Typography>
          <TextInput label="Business name"   
           id="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}/>
          {errors.name && touched.name && (
            <p style={{ color: "red" }}>{errors.name}</p>
          )}
          <TextInput label="Business category" 
          id="category"
          value={values.category}
          onChange={handleChange}
          onBlur={handleBlur}/>
          {errors.category && touched.category && (
            <p style={{ color: "red" }}>{errors.category}</p>
          )}
          <TextInput label="Business Address" 
          id="address"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}/>
          {errors.address && touched.address && (
            <p style={{ color: "red" }}>{errors.address}</p>
          )}
          <TextInput label="Contact's name" 
          id="contactName"
          value={values.contactName}
          onChange={handleChange}
          onBlur={handleBlur}/>
          {errors.contactName && touched.contactName && (
            <p style={{ color: "red" }}>{errors.contactName}</p>
          )}
          <TextInput label="Contact's email" type="email" 
          id="contactEmail"
          value={values.contactEmail}
          onChange={handleChange}
          onBlur={handleBlur}/>
          {errors.contactEmail && touched.contactEmail && (
            <p style={{ color: "red" }}>{errors.contactEmail}</p>
          )}
          <TextInput label="Contact's phone no" value={values.contactPhone}
          id="contactPhone"
          onChange={handleChange}
          onBlur={handleBlur} />
          {errors.contactPhone && touched.contactPhone && (
            <p style={{ color: "red" }}>{errors.contactPhone}</p>
          )}
          <AddButton variant="contained" sx={{width:'100%'}} 
          type="submit"
          disabled={isPending}
          onClick={handleSubmit}
          >Add business</AddButton>
        </Box>
      </Modal>
    </div>
  );
}
