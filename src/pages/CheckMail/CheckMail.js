import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Typography, ButtonBase, styled, Box, Button } from "@mui/material";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";

const Container = styled(Box)({
  width: "344px",
  height: "334px",
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const CheckMail = () => {
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
      <Typography variant="h1" sx={{ marginTop: "25px", textAlign:'center' }}>
        Check your email
      </Typography>

      <Typography variant="h5"
        sx={{ marginTop: "25px",paddingLeft:'50px', cursor: "pointer" }}>
          We have sent an OTP to your email address. 
        </Typography>
        <Typography
        variant="h5"
        sx={{ marginTop: "5px",paddingLeft:'100px', cursor: "pointer" }} >Please enter OTP pin</Typography>

        <Box sx={{display:'flex', gap:'20px', margin:'20px 50px'}}>
            <Box sx={{background:'#fff', width:'50px', height:'50px', borderRadius:'4px', border:'1px solid #2D75B6'}}></Box>
            <Box sx={{background:'#fff', width:'50px', height:'50px', borderRadius:'4px', border:'1px solid #2D75B6'}}></Box>
            <Box sx={{background:'#fff', width:'50px', height:'50px', borderRadius:'4px', border:'1px solid #2D75B6'}}></Box>
            <Box sx={{background:'#fff', width:'50px', height:'50px', borderRadius:'4px', border:'1px solid #2D75B6'}}></Box>

        </Box>

        <Button variant="contained" LinkComponent={Link} to="/reset"
        sx={{width: "100%" }}>Verify</Button>

      
        <Typography variant="h5" sx={{margin:'20px 40px'}}>Didn't receive an OTP yet?
        <ButtonBase variant="h5" sx={{color:'#2D75B6'}}>Resend </ButtonBase>
        <span variant="h5">(1:59s)</span>
        </Typography>
    </Container>
  );
};

export default CheckMail;
