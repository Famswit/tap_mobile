import * as React from 'react';
import {  Typography, Button, Box, Divider, Avatar } from '@mui/material';


import { Copy2Icon } from "assets/Icons/Copy2Icon";
import { useGetSummaryDetails } from 'api/teammates';



export default function SummaryRole({teams, handleOpenSummaryDetails}) {
  
  const { data, isLoading, isError, handleSubmit } = useGetSummaryDetails(teams?.teamsId);
  const summary = data?.data?.summary || [];
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
        <Box>
      <Box sx={{ width: "468px", height: "539px",}}>
      <Typography
        variant="h2"
        sx={{ textAlign: "center", fontStyle: "normal", marginTop: "20px" }}
      >
        Summary Details
      </Typography>

      <Box
        sx={{
          width: "419px",
          height: "323px",
          borderRadius: " 8px 8px 8px 0px",
          margin: "30px 30px",
          background: "#F9FAFA",
        }}
      >
        <Box sx={{ padding: "10px 20px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Avatar
              sx={{
                bgcolor: "#F0E9E9",
                width: "32px",
                height: "32px",
                marginTop: "20px",
                fontSize: ".9rem",
                color: "#8B5C5D",
              }}
            >
              OP
            </Avatar>
            <Button
            onClick={handleOpenSummaryDetails}       
             variant="outlined"
              size="small"
              sx={{
                width: "122px",
                height: "36px",
                color: "#2D75B6",
                borderRadius: "4px",
                border: "1px solid #2D75B6",
                marginTop: "20px",
                textTransform: "capitalize",
              }}
            >
              Change Role
            </Button>
        </Box>
          <Typography
            variant="h4"
            sx={{
              textAlign: "start",
              fontStyle: "normal",
              marginTop: "20px",
            }}
          >
          {data?.data?.permissions?.name || 'No data'}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
              marginBottom: "20px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                textAlign: "start",
                fontStyle: "normal",
                marginTop: "20px",
              }}
            >
              Email Address
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: "start",
                  fontStyle: "normal",
                  marginTop: "20px",
                }}
              >
                Teminiyi@gmail.com
              </Typography>
              <Box sx={{ marginTop: "15px", width: "15px", height: "15px" }}>
                <Copy2Icon />
              </Box>
            </Box>
          </Box>
          <Divider />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "5px",
              marginBottom: "10px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                textAlign: "start",
                fontStyle: "normal",
                marginTop: "20px",
              }}
            >
              Last login
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: "start",
                  fontStyle: "normal",
                  marginTop: "20px",
                }}
              >
                7 hours ago
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "5px",
              marginBottom: "20px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                textAlign: "start",
                fontStyle: "normal",
                marginTop: "20px",
              }}
            >
              Role
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: "start",
                  fontStyle: "normal",
                  marginTop: "20px",
                }}
              >
                Admin
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Button variant="contained" sx={{
        color: "#fff",
        width: "85%",
        marginLeft: "30px",
        marginTop: "20px",
        padding:'10px'
      }}
      onClick={handleSubmit}
      disabled={isLoading}
    >
        View Permission
    </Button>
      <Button variant="contained" sx={{
          background: "#FC6250",
          color: "#fff",
          width: "85%",
          marginLeft: "30px",
          marginTop: "20px",
          padding:'10px'
        }}
      >
          Remove member
      </Button>
    </Box>

    </Box>
    </div>
  );
}