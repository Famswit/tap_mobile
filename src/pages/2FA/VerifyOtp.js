import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, ButtonBase, styled, Box, Button, CircularProgress } from "@mui/material";
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

const OtpInputContainer = styled(Box)({
  display: "flex",
  gap: "1px",
  justifyContent: "center",
  margin: "20px 0px 20px 0px",
});

const OtpInput = styled(TextInput)({
  width: "40px",
  height: "40px",
  textAlign: "center",
  fontSize: "20px",
  borderRadius: "4px",
});

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(119);
  const [isResendActive, setIsResendActive] = useState(false);
  const [fakeLoading, setFakeLoading] = useState(false);

  const { mutate, isPending } = useVerifyOtp();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const inputRefs = useRef([]);

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

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (otp.some((digit) => digit === "")) {
      enqueueSnackbar("Please fill all OTP fields", { variant: "error" });
      return;
    }
  
    const otpValue = otp.join("");
  
    if (/^\d{4}$/.test(otpValue)) {
      setFakeLoading(true);
      setTimeout(() => {
        enqueueSnackbar("Verification successful", { variant: "success" });
        navigate("/dashboard");
        setFakeLoading(false);
      }, 1500); 
    } else {
      enqueueSnackbar("Invalid OTP", { variant: "error" });
    }
  };
  

  return (
    <Container>
      <Typography variant="h1" sx={{ marginTop: "25px" }}>
        Verify your email
      </Typography>

      <Typography variant="h5" sx={{ marginTop: "25px", cursor: "pointer" }}>
        OTP sent to your email address.
      </Typography>
      <Typography variant="h5" sx={{ marginTop: "5px", cursor: "pointer" }}>
        Please enter OTP pin
      </Typography>

      <form onSubmit={handleSubmit}>
        <OtpInputContainer>
          {otp.map((digit, index) => (
            <OtpInput
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              inputRef={(el) => (inputRefs.current[index] = el)}
              maxLength={1}
              autoFocus={index === 0}
            />
          ))}
        </OtpInputContainer>

        <Button
          variant="contained"
          type="submit"
          sx={{ width: "100%" }}
          disabled={fakeLoading}
        >
          Verify
          {fakeLoading && (
            <CircularProgress
              size={18}
              color="primary"
              style={{ marginLeft: "10px" }}
    />
  )}
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