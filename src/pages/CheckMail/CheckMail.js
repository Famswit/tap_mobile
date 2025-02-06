import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Typography,
  ButtonBase,
  styled,
  Box,
  Button,
} from "@mui/material";
import { useSnackbar } from "notistack";

import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import { useVerifyEmail } from "api/Auth/verifyEmail";

const Container = styled(Box)({
  width: "344px",
  height: "400px",
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const CheckMail = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(119); // 1:59
  const [isResendActive, setIsResendActive] = useState(false);

  const { mutate, isPending } = useVerifyEmail();
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

    return () => clearInterval(interval); // Cleanup interval
  }, [timer]);

  const handleResend = () => {
    setTimer(119); // Reset timer to 1:59
    setIsResendActive(false);
    enqueueSnackbar("OTP resent successfully", { variant: "info" });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle OTP input change
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus on the next box
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
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
      { otp: otp.join("") }, // Combine OTP digits into a string
      {
        onSuccess: (res) => {
          if (res.status !== "error") {
            enqueueSnackbar("Verification successful", { variant: "success" });
            navigate("/reset"); // Navigate only if verification succeeds
          } else {
            enqueueSnackbar(res.message, { variant: "error" });
          }
        },
      }
    );
  };

  return (
    <Container>
      <Avatar
        sx={{
          marginLeft: "120px",
          width: "101px",
          height: "101px",
          bgcolor: "#E8EEF4",
        }}
      >
        <MarkEmailUnreadOutlinedIcon
          fontSize="large"
          sx={{ width: "43px", height: "43px", color: "#2D75B6" }}
        />
      </Avatar>
      <Typography variant="h1" sx={{ marginTop: "25px", textAlign: "center" }}>
        Check your email
      </Typography>

      <Typography
        variant="h5"
        sx={{ marginTop: "25px", paddingLeft: "50px", cursor: "pointer" }}
      >
        We have sent an OTP to your email address.
      </Typography>
      <Typography
        variant="h5"
        sx={{ marginTop: "5px", paddingLeft: "100px", cursor: "pointer" }}
      >
        Please enter OTP pin
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: "20px", margin: "20px 50px" }}>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              style={{
                background: "#fff",
                width: "50px",
                height: "50px",
                textAlign: "center",
                fontSize: "18px",
                borderRadius: "4px",
                border: "1px solid #2D75B6",
              }}
            />
          ))}
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

export default CheckMail;
