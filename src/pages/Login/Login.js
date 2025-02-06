import {
  Box,
  Button,
  CircularProgress,
  styled,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { TextInput } from "components/TextInput";
import { useFormik } from "formik";
import { validationLogin } from "schema/loginValidation";
import { useSnackbar } from "notistack";
import { useAuthContext } from "context/AuthContext";

export const Container = styled(Box)({
  width: "344px",
  height: "400px",
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const Login = () => {
  const authCtx = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Dummy user credentials for login
  const DUMMY_USER = {
    email: "testuser@example.com",
    password: "password123",
    token: "fake-jwt-token-12345",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: validationLogin,

      onSubmit: (values) => {
        setIsLoading(true);

        setTimeout(() => {
          if (
            values.email === DUMMY_USER.email &&
            values.password === DUMMY_USER.password
          ) {
            sessionStorage.setItem("token", DUMMY_USER.token);
            authCtx.toggleAuth();
            enqueueSnackbar("Login Successful", { variant: "success" });

            // ✅ Redirect to dashboard after login
            navigate("/request-otp");
          } else {
            enqueueSnackbar("Invalid email or password", { variant: "error" });
          }

          setIsLoading(false);
        }, 1500); // Simulate a delay (fake API response)
      },
    });

  return (
    <Container>
      <Typography variant="h1">Log in to your account</Typography>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (
          <Typography variant="body2" sx={{ color: "red" }}>
            {errors.email}
          </Typography>
        )}

        <TextInput
          type="password"
          label="Password"
          placeholder="Enter your password"
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password && (
          <Typography variant="body2" sx={{ color: "red" }}>
            {errors.password}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: "30px", width: "100%" }}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={18} color="primary" />
          ) : (
            "Log in"
          )}
        </Button>
      </form>

      <Box sx={{ marginTop: "25px", textAlign: "center" }}>
        <Typography variant="h5">
          Forgot your password?{" "}
          <Link to="/forget" style={{ color: "black", textDecoration: "none" }}>
            Reset it here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};
