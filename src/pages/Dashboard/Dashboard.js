import { Box, Typography, Paper, styled  } from "@mui/material";
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import React from "react";


import DashboardTable from "./components/Table/DataTable";

export const CardContainer = styled(Paper)({
    width: '260px',
    height: '117px',
    boxShadow: '0px 1px 12px 0px rgba(21, 41, 82, 0.03)',

    borderRadius: '10px',
    border: '1px solid #F1F0F5',
    background: 'var(--neutrals-white, #FFF)',
 })


export const Dashboard = () => {
    return (
        <Box sx={{ width:'100%', zIndex: '100',}}>
            <Typography sx={{ marginBottom:'50px', fontWeight:'800', fontSize:"1.4rem"}}>Welcome Back josh,</Typography>
            <Box sx={{width:'100%', display:'flex',  gap:'24px', flexWrap:'wrap'}}>
            <CardContainer sx={{padding:'1rem'}}> 
                <Box sx={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                    <Typography variant="h5" >Total Businesses</Typography>
                    <FormControlLabel value="male" sx={{marginTop:'-10px'}} disabled control={<Radio />}  />  
                </Box>
                    <Typography variant="h1">56</Typography>

            </CardContainer>
            <CardContainer sx={{padding:'1rem'}}> 
            <Box sx={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                    <Typography variant="h5">Total Businesses</Typography>
                    <FormControlLabel value="male" sx={{marginTop:'-10px'}} disabled control={<Radio />}  />   </Box>
                    <Typography variant="h2">NGN 120,000,000</Typography>

            </CardContainer>


            <CardContainer sx={{padding:'1rem'}}> 
            <Box sx={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                    <Typography variant="h5">Total Businesses</Typography>
                    <FormControlLabel value="male" sx={{marginTop:'-10px'}} disabled control={<Radio />}  />   </Box>
                    <Typography variant="h2">NGN 2,500,000</Typography>

            </CardContainer>


            <CardContainer sx={{padding:'1rem'}}> 
            <Box sx={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                    <Typography variant="h5">Total Businesses</Typography>
                    <FormControlLabel value="male" sx={{marginTop:'-10px'}} disabled control={<Radio />}  />   </Box>
                    <Typography variant="h2">NGN 3,200,000</Typography>

            </CardContainer>

            </Box>         
            
            
            <DashboardTable />

        </Box>
    )
}

