import { Box, Stack, Typography, Button } from "@mui/material";
import { useGetSettingsProfile } from "api/settings";

import {TextInput} from 'components/TextInput';

export const Profile = () => {
  const { data, isLoading, isError } = useGetSettingsProfile();
  const settingsProfile = Array.isArray(data?.data?.profile) ? data.data.profile : [''];
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <Stack spacing={3} sx={{ margin: "-10px 30px" }}>
    {settingsProfile.map(( index) => (
      <Box sx={{display:'flex', flexDirection:'column', gap:'20px'}}>
      <Box key={index}>
        <Typography variant="h4" sx={{marginBottom:'5px'}}>Full Name</Typography>
        <Box
          disableRipple
          sx={{
            color: "#000",
            borderRadius: "3px",
            height: "48px",
            width: "500px",
            border: "1px solid var(--Colours-Greys-Soap-200, #EBEDEF)",
            background: "#fff",
          }}
        >
          <Typography variant="h4" style={{margin:'15px 20px'}}>{data?.data?.profile?.fullname || 'No data'}</Typography>
        </Box>
        
      </Box>
      <Box>
      <Typography variant="h4" sx={{marginBottom:'5px'}}>Email Address</Typography>
      <Box disableRipple
        sx={{
          color: "#000",
          borderRadius: "3px",
          height: "48px",
          width: "100%",
          border: "1px solid var(--Colours-Greys-Soap-200, #EBEDEF)",
          background: "#fff",
        }}
      >
        <Typography variant="h4" style={{margin:'15px 20px'}}>{data?.data?.profile?.email || 'No data'}</Typography>
      </Box>
    </Box>
    <Box>
    <Typography variant="h4" sx={{marginBottom:'5px'}}>Role</Typography>
    <Box disableRipple
      sx={{
        color: "#000",
        borderRadius: "3px",
        height: "48px",
        width: "100%",
        border: "1px solid var(--Colours-Greys-Soap-200, #EBEDEF)",
        background: "#fff",
      }}
    >
      <Typography variant="h4" style={{margin:'15px 20px'}}>{data?.data?.profile?.createdBy || 'No data'}</Typography>
    </Box>
  </Box>
    </Box>
    ))}
      
     
    </Stack>
  );
};
