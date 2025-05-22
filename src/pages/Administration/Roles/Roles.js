import React, { useState } from "react";
import { Box, Typography, Stack, Avatar, Card, styled } from "@mui/material";
import CreateRole from "./components/CreateRole";
import Permission from "./components/Permission";

// Styled Components for Responsive Layout
const HeaderBox = styled(Box)(({ theme }) => ({
  marginLeft: "200px",
  width: "100%",
  paddingRight: "20px",
  [theme.breakpoints.down("md")]: {
    marginLeft: "150px",
    paddingRight: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: "20px",
    paddingRight: "12px",
  },
  [theme.breakpoints.down("xs")]: {
    marginLeft: "10px",
    paddingRight: "8px",
  },
}));

const HeaderFlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "1rem",
    alignItems: "flex-start",
  },
}));

const CardsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "30px",
  flexWrap: "wrap",
  [theme.breakpoints.down("md")]: {
    gap: "24px",
  },
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
    gap: "20px",
  },
  [theme.breakpoints.down("xs")]: {
    gap: "16px",
  },
}));

const RoleCard = styled(Card)(({ theme }) => ({
  width: "353px",
  height: "159px",
  borderRadius: "6px",
  background: "#FFF",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.10)",
  [theme.breakpoints.down("md")]: {
    width: "320px",
    height: "150px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "380px",
    height: "160px",
  },
  [theme.breakpoints.down("xs")]: {
    width: "90%", 
    height: "130px",
  },
}));

export const Roles = () => {
  const [roles, setRoles] = useState([
    {
      name: "Admin",
      permissions: ["canViewTransaction", "canExportTransaction"],
      lastModified: "Nov 21, 2022 at 9:30",
      avatar: "A",
    },
    {
      name: "Customer Support",
      permissions: ["canViewBusinesses", "canInviteNewMember"],
      lastModified: "Nov 21, 2022 at 9:30",
      avatar: "C",
    },
  ]);

  const handleAddRole = (newRole) => {
    setRoles([...roles, newRole]);
  };

  return (
    <Box>
      <Stack direction="column" spacing={10}>
        <HeaderBox>
          <HeaderFlexBox>
            <Typography sx={{ fontWeight: "800", fontSize: "1.4rem" }}>
              Roles and permissions
            </Typography>
            <CreateRole onAddRole={handleAddRole} />
          </HeaderFlexBox>
        </HeaderBox>

        <CardsContainer>
          {roles.map((role, index) => (
            <RoleCard key={index}>
              <Box sx={{ display: 'flex', padding: '15px', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h2" sx={{ fontSize: "16px" }}>
                  {role.name}
                </Typography>
                <Typography variant="h5" sx={{ fontSize: "9px", marginTop: "5px" }}>
                  Last modified: {role.lastModified}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', padding: '34px 15px', justifyContent: 'space-between', alignItems: 'center'}}>
                <Avatar sx={{ bgcolor: "#F0E9E9", width: '32px', height: '32px', marginTop: '25px', fontSize: '.9rem', color: '#8B5C5D' }}>
                  {role.avatar}
                </Avatar>
                <Box>
                  <Permission />
                </Box>
              </Box>
            </RoleCard>
          ))}
        </CardsContainer>
      </Stack>
    </Box>
  );
};