import * as React from 'react';
import { Typography, Button, Box, Divider, Avatar } from '@mui/material';
import { Copy2Icon } from "assets/Icons/Copy2Icon";

export default function SummaryRole({ teamMate, handleOpenSummaryDetails }) {
  if (!teamMate) return null; // Ensure the component doesn't render without data
  
  return (
    <Box sx={{ width: "468px", padding: "20px", background: "#fff", borderRadius: "8px" }}>
      <Typography
        variant="h2"
        sx={{ textAlign: "center", marginBottom: "20px" }}
      >
        Summary Details
      </Typography>

      <Box sx={{ background: "#F9FAFA", borderRadius: "8px", padding: "20px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: "#F0E9E9",
              width: "56px",
              height: "56px",
              color: "#8B5C5D",
            }}
          >
            {teamMate.fullname[0]}
          </Avatar>
          <Button
            onClick={handleOpenSummaryDetails}
            variant="outlined"
            size="small"
            sx={{
              width: "122px",
              color: "#2D75B6",
              borderRadius: "4px",
              border: "1px solid #2D75B6",
              textTransform: "capitalize",
            }}
          >
            Change Role
          </Button>
        </Box>

        {/* Fullname */}
        <Typography variant="h4" sx={{ marginTop: "20px", fontWeight: "bold" }}>
          {teamMate.fullname}
        </Typography>

        {/* Email */}
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
          <Typography variant="h5">Email Address</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Typography variant="h5">{teamMate.email}</Typography>
            <Copy2Icon /> {/* Placeholder for copy functionality */}
          </Box>
        </Box>

        <Divider sx={{ marginY: "20px" }} />

        <Box  sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "5px",
          marginBottom: "10px",
        }}>
            <Typography variant="h5"
            sx={{
              textAlign: "start",
              fontStyle: "normal",
              marginTop: "20px",
            }}>Last Login</Typography>
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
        <Divider sx={{ marginY: "20px" }} />

        {/* Role */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">Role</Typography>
          <Typography variant="h5">{teamMate.roles}</Typography>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Button
        variant="contained"
        sx={{
          width: "100%",
          marginTop: "20px",
          padding: '10px',
          backgroundColor: "#2D75B6",
        }}
      >
        View Permission
      </Button>
      <Button
        variant="contained"
        sx={{
          background: "#FC6250",
          color: "#fff",
          width: "100%",
          marginTop: "10px",
          padding: '10px'
        }}
      >
        Remove Member
      </Button>
    </Box>
  );
}
