import React from "react";
import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import {SideNav} from "./components/SideNav";

const Layout = () => {
  return (
    <Box position="relative">
      <Box position="fixed" sx={{ zIndex: "1", width: "100%" }}>
        <Header />
      </Box>
      <Stack direction="row" spacing={40}>
        <Box position="fixed" sx={{ zIndex: "5" }}>
          <SideNav />
        </Box>
        <Box sx={{ width: "100%", position: "relative", paddingTop: "130px" }}>
          <Outlet />
        </Box>
      </Stack>
    </Box>
  );
};

export default Layout;
