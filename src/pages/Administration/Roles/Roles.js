import React, { useState } from "react";
import { Box, Typography, Stack, Avatar, Card } from "@mui/material";
import CreateRole from "./components/CreateRole";
import Permission from "./components/Permission";

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
        <Box sx={{ marginLeft: "200px", width: "100%", paddingRight: "20px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: "800", fontSize: "1.4rem" }}>
              Roles and permissions
            </Typography>
            <CreateRole onAddRole={handleAddRole} />
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          {roles.map((role, index) => (
            <Card
              key={index}
              sx={{
                width: "353px",
                height: "159px",
                borderRadius: "6px",
                background: "#FFF",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.10)",
              }}
            >
              <Box sx={{ display: 'flex', padding: '15px', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h2" sx={{ fontSize: "16px" }}>
                  {role.name}
                </Typography>
                <Typography variant="h5" sx={{ fontSize: "9px", marginTop: "5px" }}>
                  Last modified: {role.lastModified}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', padding: '34px 15px', justifyContent: 'space-between', alignItems: 'center'}}>
                <Avatar sx={{ bgcolor: "#F0E9E9", width: '32px', height: '32px', marginTop: '25px', fontSize: '.9rem', color: '#8B5C5D'  }}>
                  {role.avatar}
                </Avatar>
                <Box>
                  <Permission />
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};
