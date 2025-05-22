import React from 'react';
import { Box, Stack, Typography, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";

import { ChangePassword } from "./components/ChangePassword";
import { Profile } from "./components/Profile";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const Setting = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Stack direction="column" spacing={10}>
        <Typography variant="h2">Settings</Typography>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: isMobile ? "column" : "row", 
            height: isMobile ? "auto" : 100, 
            minHeight: isMobile ? "100vh" : "auto", 
          }}
        >
          <Tabs
            orientation={isMobile ? "horizontal" : "vertical"} 
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Settings tabs"
            sx={{
              borderRight: isMobile ? 0 : 1, 
              borderBottom: isMobile ? 1 : 0, 
              borderColor: "divider",
              width: isMobile ? "100%" : "auto", 
              minWidth: isMobile ? "auto" : 200, 
            }}
          >
            <Tab
              label="Profile Information"
              {...a11yProps(0)}
              sx={{
                fontSize: isMobile ? "0.85rem" : "1rem", 
                padding: isMobile ? "10px" : "12px 16px",
              }}
            />
            <Tab
              label="Change password"
              {...a11yProps(1)}
              sx={{
                fontSize: isMobile ? "0.85rem" : "1rem",
                padding: isMobile ? "10px" : "12px 16px",
              }}
            />
          </Tabs>
          <Box
            sx={{
              flexGrow: 1,
              width: isMobile ? "100%" : "auto", 
            }}
          >
            <TabPanel value={value} index={0}>
              <Profile />
            </TabPanel>

            <TabPanel value={value} index={1}>
              <ChangePassword />
            </TabPanel>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};