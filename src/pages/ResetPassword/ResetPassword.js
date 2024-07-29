import { Typography, Button, CircularProgress, Box, styled } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import { TextInput } from "../../components/TextInput";
import { useResetPassword } from "api/Auth/forgetPassword";
import {  validationResetPassword } from "schema/loginValidation";

export const Container = styled(Box)({
  width: "344px",
  height: "334px",
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useResetPassword();
  const { enqueueSnackbar } = useSnackbar();


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: validationResetPassword,

      onSubmit:( values)=> {
        mutate(
          { data: { newPassword: values.newPassword, confirmPassword: values.confirmPassword} },
          
            {
              onError: (err) => {
                console.log({ err });
              },
              onSuccess: (res) => {
                if (res.status !== "error") {
                  enqueueSnackbar("Password reset successful", { variant: "success" });
                  navigate("/login")
                 } else {
                  enqueueSnackbar(res.message, { variant: "error" });
                }
              },
            }
          

        )

      }

    })


  return (
    <Container>
      <Typography variant="h1">Set a new password</Typography>
      <Typography variant="h5" sx={{ marginTop: "15px" }}>
        Enter a new password to access the settlement portal
      </Typography>

      <TextInput type="password" label="Password" id="password"
          name="newPassword"
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur} />
          {errors.newPassword && touched.newPassword && (
            <p style={{ color: "red" }}>{errors.newPassword}</p>
          )}
      <TextInput type="password" label="Confirm Password" id="confirmPassword"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}/>
          {errors.confirmPassword && touched.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword}</p>
          )}
      <Button
        
        type="submit"
        variant="contained"
        onClick={handleSubmit}
        disabled={isPending}
        sx={{ marginTop: "30px", width: "100%" }}
      >
        Change Password
        {isPending && (
          <CircularProgress
            size={18}
            color="primary"
            style={{ marginLeft: "10px" }}
          />
        )}
      </Button>
    </Container>
  );
};
