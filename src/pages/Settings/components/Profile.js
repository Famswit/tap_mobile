import React, { useState, useEffect } from "react";

import { Box, Stack, Typography } from "@mui/material";

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
    <Stack
      spacing={3}
      sx={{
        margin: { xs: "0 10px", sm: "-10px 20px", md: "-10px 30px" }, 
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              marginBottom: '5px',
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.1rem', lg:'0.9rem' },
            }}
          >
            Full Name
          </Typography>
          <Box
            sx={{
              color: "#000",
              borderRadius: "3px",
              height: { xs: "40px", sm: "44px", md: "48px" }, 
              width: { xs: "90%", sm: "90%", md: "500px" }, 
              border: "1px solid #EBEDEF",
              background: "#fff",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                margin: { xs: '0 10px', sm: '0 15px', md: '15px 20px' }, 
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1rem' }, 
              }}
            >
              {profile?.fullname || 'No data'}
            </Typography>
          </Box>
        </Box>
        
        <Box>
          <Typography
            variant="h4"
            sx={{
              marginBottom: '5px',
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1rem', lg:'0.9rem' },
            }}
          >
            Email Address
          </Typography>
          <Box
            sx={{
              color: "#000",
              borderRadius: "3px",
              height: { xs: "40px", sm: "44px", md: "48px" },
              width: { xs: "90%", sm: "90%", md: "500px" }, 
              border: "1px solid #EBEDEF",
              background: "#fff",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                margin: { xs: '0 10px', sm: '0 15px', md: '15px 20px' },
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1rem' },
              }}
            >
              {profile?.email || 'No data'}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography
            variant="h4"
            sx={{
              marginBottom: '5px',
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1rem', lg:'0.9rem' },
            }}
          >
            Role
          </Typography>
          <Box
            sx={{
              color: "#000",
              borderRadius: "3px",
              height: { xs: "40px", sm: "44px", md: "48px" },
              width: { xs: "90%", sm: "90%", md: "500px" }, 
              border: "1px solid #EBEDEF",
              background: "#fff",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                margin: { xs: '0 10px', sm: '0 15px', md: '15px 20px' },
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1rem' },
              }}
            >
              {profile?.createdBy || 'No data'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};