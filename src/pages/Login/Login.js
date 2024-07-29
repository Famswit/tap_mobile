import {
  Box,
  Button,
  CircularProgress,
  styled,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import React from "react";

import { TextInput } from "components/TextInput";
import { useLoginUser } from "api/Auth/login";
import { useFormik } from "formik";
import { validationLogin } from "schema/loginValidation";
import { useSnackbar } from "notistack";
import { useAuthContext } from "context/AuthContext";


export const Container = styled(Box)({
  width: "344px",
  height: "334px",
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});
export const Login = () => {
  const authCtx = useAuthContext();
  const { mutate, isPending } = useLoginUser();
  const { enqueueSnackbar } = useSnackbar();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: validationLogin,

      onSubmit: (values) => {
        mutate(
          { data: { email: values.email, password: values.password } },
          {
            onError: (err) => {
              console.log({ err });
            },
            onSuccess: (res) => {
              if (res.status !== "error") {
                authCtx.toggleAuth();
                sessionStorage.setItem('token', res.data.token);
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
    <Container>
      <Typography variant="h1">Log in to your account</Typography>
      <form>
        <TextInput
          label="Email Address"
          placeholder="enter email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (
          <p style={{ color: "red" }}>{errors.email}</p>
        )}
        <TextInput
          type="password"
          label="Password"
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password && (
          <p style={{ color: "red" }}>{errors.password}</p>
        )}

        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: "30px", width: "100%" }}
          disabled={isPending}
          onClick={handleSubmit}
        >
          Log in
          {isPending && (
            <CircularProgress
              size={18}
              color="primary"
              style={{ marginLeft: "10px" }}
            />
          )}
        </Button>
      </form>
      <Box sx={{ marginTop: "25px", textAlign: "center" }}>
        <Typography variant="h5" sx={{ color: "secondary.main" }}>
          forget your password?
          <Link to="/forget" style={{ color: "black", textDecoration: "none" }}>
            Reset it here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};
