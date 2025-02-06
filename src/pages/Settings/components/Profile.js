import React, { useState, useEffect } from "react";

import { Box, Stack, Typography, Button } from "@mui/material";



// Sample function to generate fake profile data
const generateFakeProfile = () => {
  return {
    fullname: "APX Enterprise",
    email: "APX@example.com",
    createdBy: "Admin", 
  };
};

const SettingsProfile = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData({ data: { profile: generateFakeProfile() } });
      setIsLoading(false);
    }, 1000); 
  }, []);

  return { data, isLoading, isError };
};

export const Profile = () => {
  const { data, isLoading, isError } = SettingsProfile();
  const profile = data?.data?.profile;

  if (isLoading) return <div>Loading...</div>;
 // if (isError) return <div>Error fetching data</div>;

  return (
    <Stack spacing={3} sx={{ margin: "-10px 30px" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Box>
          <Typography variant="h4" sx={{ marginBottom: '5px' }}>Full Name</Typography>
          <Box
            sx={{
              color: "#000",
              borderRadius: "3px",
              height: "48px",
              width: "500px",
              border: "1px solid #EBEDEF",
              background: "#fff",
            }}
          >
            <Typography variant="h4" style={{ margin: '15px 20px' }}>{profile?.fullname || 'No data'}</Typography>
          </Box>
        </Box>
        
        <Box>
          <Typography variant="h4" sx={{ marginBottom: '5px' }}>Email Address</Typography>
          <Box
            sx={{
              color: "#000",
              borderRadius: "3px",
              height: "48px",
              width: "100%",
              border: "1px solid #EBEDEF",
              background: "#fff",
            }}
          >
            <Typography variant="h4" style={{ margin: '15px 20px' }}>{profile?.email || 'No data'}</Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="h4" sx={{ marginBottom: '5px' }}>Role</Typography>
          <Box
            sx={{
              color: "#000",
              borderRadius: "3px",
              height: "48px",
              width: "100%",
              border: "1px solid #EBEDEF",
              background: "#fff",
            }}
          >
            <Typography variant="h4" style={{ margin: '15px 20px' }}>{profile?.createdBy || 'No data'}</Typography>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

