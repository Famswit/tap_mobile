import React from "react";
import {
  Button,
  Typography,
  CircularProgress,
  styled,
  Box,
  ButtonBase,
  FormControlLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";


import { TextInput } from "components/TextInput";
import { useForgetPassword } from "api/Auth/forgetPassword";
import { validationForgetPassword } from "schema/loginValidation";
import { useAuthContext } from "context/AuthContext";
import { useState } from "react";
import { CheckBox } from "@mui/icons-material";



export const Container = styled(Box)({
  width: "344px",
  height: "334px",
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const RequestOtp = (data) => {
  const { mutate, isPending } = useForgetPassword();
  const authCtx = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [rememberDevice, setRememberDevice] = useState(false);
  const [maskedEmail, setMaskedEmail] = useState("joh***@gmail.com");

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
                navigate("/verify-otp");

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
      <Typography variant="h1">Request account otp</Typography>
      <Typography variant="h5" sx={{ background:'#0000', marginTop: "25px" }}>
        Enter your email address, an OTP will be sent to {maskedEmail}
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
      <FormControlLabel sx={{marginTop:'20px', marginLeft:'5px'}} control={<CheckBox checked={rememberDevice} onChange={() => setRememberDevice(!rememberDevice)} />} label="Remember this device for 30 days" />

      <Button
      type="submit"
        variant="contained"
        sx={{ marginTop: "30px", width: "100%" }}
        disabled={isPending}
      >
        submit
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
      </ButtonBase>
    </Container>
  );
};
