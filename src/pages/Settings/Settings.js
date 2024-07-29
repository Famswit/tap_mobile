import React from 'react';
import { Box, Stack, Typography, Tab, Tabs } from "@mui/material";

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
            height: 100,
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Profile Information" {...a11yProps(0)} />
            <Tab label="Change password" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Profile />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <ChangePassword />
          </TabPanel>
        </Box>
      </Stack>
    </Box>
  );
};
