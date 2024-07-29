import React from "react";
import {
  Button,
  Typography,
  CircularProgress,
  styled,
  Box,
  ButtonBase,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";


import { TextInput } from "components/TextInput";
import { useForgetPassword } from "api/Auth/forgetPassword";
import { validationForgetPassword } from "schema/loginValidation";
import { useAuthContext } from "context/AuthContext";


export const Container = styled(Box)({
  width: "344px",
  height: "334px",
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const ForgetPassword = () => {
  const { mutate, isPending } = useForgetPassword();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const authCtx = useAuthContext();


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: validationForgetPassword,

      onSubmit:( values)=> {
        mutate(
          { data: { email: values.email} },
          {
            onSuccess: (res) => {
              if(res.status !== "error") {
                enqueueSnackbar("Link sent Successful. Link expires in 5 minutes", { variant: "success" })
              } else{
                enqueueSnackbar(res.message, { variant: "error" });
              }

            }
          }

        )

      }

    })


  
  return (
    <Container>
      <Typography variant="h1">Forget your password?</Typography>
      <Typography variant="h5" sx={{ marginTop: "25px" }}>
        Enter your email address and we'll send you a link to reset your
        password
      </Typography>

      <TextInput label="Email Address" id="email" 
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
      />
      {errors.email && touched.email && (
        <p style={{ color: "red" }}>{errors.email}</p>
      )}
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ marginTop: "30px", width: "100%" }}
        disabled={isPending}

      >
        Continue
        {isPending && (
          <CircularProgress
            size={18}
            color="primary"
            style={{ marginLeft: "10px" }}
          />
        )}
      </Button>

      <ButtonBase
        LinkComponent={Link}
        disableRipple
        to="/login"
        style={{ width: "100%", textDecoration: "none", color: "#000" }}
      >
        <Typography
          variant="h5"
          sx={{ marginTop: "25px", textAlign: "center", cursor: "pointer" }}
        >
          Return to Log in
        </Typography>
      </ButtonBase>
    </Container>
  );
};
