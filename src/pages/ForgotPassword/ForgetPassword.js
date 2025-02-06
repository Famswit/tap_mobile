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

export const ForgetPassword = (data) => {
  const { mutate, isPending } = useForgetPassword();
  const authCtx = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  console.log(data)


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
                enqueueSnackbar("Link sent Successful. Link expires in 5 minutes", { variant: "success" });
                navigate("/check");

              } else{
                enqueueSnackbar(res.message, { variant: "error" });
              }
            }
          }

        )

      }

    })

  // const handleSubmit = () => {
  //   if (!errors.email && values.email) {
  //     navigate("/check"); // Navigate if no validation errors
  //   }
  // }
  return (
    <Container>
      <Typography variant="h1">Forget your password?</Typography>
      <Typography variant="h5" sx={{ marginTop: "25px" }}>
        Enter your email address and we'll send you a link to reset your
        password
      </Typography>
    <form onSubmit={handleSubmit}>
      <TextInput label="Email Address" id="email" 
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
      />
      {errors.email && touched.email && (
        <p style={{ color: "red" }}>{errors.email}</p>
      )}
      <Button
      type="submit"
        variant="contained"
        sx={{ marginTop: "30px", width: "100%" }}
        disabled={isPending}
        onClick={handleSubmit}
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
      </form>
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
