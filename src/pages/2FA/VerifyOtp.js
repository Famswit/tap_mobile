import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  ButtonBase,
  styled,
  Box,
  Button,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { TextInput } from "components/TextInput";
import { useVerifyOtp } from "api/Auth/Otp";

const Container = styled(Box)({
  width: "344px",
  height: "400px",
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

 const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(119); 
  const [isResendActive, setIsResendActive] = useState(false);

  const { mutate, isPending } = useVerifyOtp();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // Timer functionality
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setIsResendActive(true);
    }

    return () => clearInterval(interval); 
  }, [timer]);

  const handleResend = () => {
    setTimer(119); 
    setIsResendActive(false);
    enqueueSnackbar("OTP resent successfully", { variant: "info" });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }; 

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (otp.some((digit) => digit === "")) {
      enqueueSnackbar("Please fill all OTP fields", { variant: "error" });
      return;
    } else {
      navigate("/reset")
    }

    mutate(
      { otp: otp.join("") }, 
      {
        onSuccess: (res) => {
          if (res.status !== "error") {
            enqueueSnackbar("Verification successful", { variant: "success" });
            navigate("/dashboard"); 
          } else {
            enqueueSnackbar(res.message, { variant: "error" });
          }
        },
      }
    );
  };

  return (
    <Container>
     
      <Typography variant="h1" sx={{ marginTop: "25px"}}>
        Verify your email
      </Typography>

      <Typography
        variant="h5"
        sx={{ marginTop: "25px", cursor: "pointer" }}
      >
         OTP sent to your email address.
      </Typography>
      <Typography
        variant="h5"
        sx={{ marginTop: "5px", cursor: "pointer" }}
      >
        Please enter OTP pin
      </Typography>

      <form onSubmit={handleSubmit}>
      <Box sx={{margin:'20px 0px 20px 0px'}}>
        <TextInput
            placeholder="enter otp sent"
            id="otp"
  />
      </Box>
     

        <Button
          variant="contained"
          type="submit"
          sx={{ width: "100%" }}
          disabled={isPending}
        >
          Verify
        </Button>
      </form>

      <Typography variant="h5" sx={{ margin: "20px 40px" }}>
        Didn't receive an OTP yet?
        <ButtonBase
          variant="h5"
          sx={{
            color: isResendActive ? "#2D75B6" : "#B0BEC5",
            paddingLeft: "10px",
            cursor: isResendActive ? "pointer" : "default",
          }}
          onClick={isResendActive ? handleResend : null}
          disabled={!isResendActive}
        >
          Resend
        </ButtonBase>
        <span variant="h5" style={{ paddingLeft: "5px" }}>
          ({formatTime(timer)})
        </span>
      </Typography>
    </Container>
  );
};

export default VerifyOtp;
