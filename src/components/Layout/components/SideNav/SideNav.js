import React from "react";
import {
  Box,
  styled,
  List,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";

import { BusinessIcon } from "assets/Icons/BusinessIcon";
import { ActivityIcon } from "assets/Icons/ActivityIcon";
import { SettingsIcon } from "assets/Icons/SettingsIcon";
import { TrasactionIcon } from "assets/Icons/TransactionIcon";
import { DashIcon } from "assets/Icons/DashIcon";
import { AdminIcon } from "assets/Icons/AdminIcon";
import tlogo from "assets/images/tlogo.png";
import Logout from "./components/Logout";
import { NavItem } from "./components/NavItem";

// Styled Components
const Container = styled(Box)(({ theme }) => ({
  width: "260px",
  height: "100vh",
  background: "#F9FAFA",
  padding: "20px",
  position: "fixed",
  top: 0,
  left: 0,
  overflowY: "hidden", // Changed to hidden to remove scrollbar
  zIndex: 1000,
  [theme.breakpoints.down("lg")]: {
    width: "220px",
    padding: "18px",
  },
  [theme.breakpoints.down("md")]: {
    width: "200px",
    padding: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "200px",
    padding: "16px",
    transform: "translateX(-100%)",
    transition: "transform 0.3s ease-in-out",
    "&.open": {
      transform: "translateX(0)",
    },
  },
  [theme.breakpoints.down("xs")]: {
    width: "180px",
    padding: "12px",
  },
}));

const MenuListContainer = styled(List)(({ theme }) => ({
  marginTop: "25px",
  paddingBottom: "20px", // Reduced padding to minimize height
  [theme.breakpoints.down("md")]: {
    marginTop: "20px",
    paddingBottom: "15px",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "15px",
    paddingBottom: "10px",
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    marginTop: "15px",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "10px",
    "& img": {
      height: 40,
      width: 54,
    },
  },
  [theme.breakpoints.down("xs")]: {
    "& img": {
      height: 35,
      width: 48,
    },
  },
}));

const sidebarVariants = {
  hidden: { x: -260, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
    },
  },
};

export const SideNav = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            top: "10px",
            left: "10px",
            zIndex: 1100,
            cursor: "pointer",
          }}
          onClick={toggleSidebar}
        >
          {/* Hamburger icon */}
          <Box
            sx={{
              width: 30,
              height: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "100%", height: 3, background: "#000" }} />
            <Box sx={{ width: "100%", height: 3, background: "#000" }} />
            <Box sx={{ width: "100%", height: 3, background: "#000" }} />
          </Box>
        </Box>
      )}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
        style={{ position: "relative" }}
      >
        <Container className={isMobile && isSidebarOpen ? "open" : ""}>
          <LogoContainer>
            <img src={tlogo} height={50} width={68} alt="Logo" />
          </LogoContainer>

          <Box>
            <MenuListContainer>
              <NavItem to="/dashboard" name="Dashboard" icon={<DashIcon />} />
              <NavItem
                to="/transactions"
                name="Transactions"
                icon={<TrasactionIcon />}
              />
              <NavItem to="/business" name="Businesses" icon={<BusinessIcon />} />

              <NavItem
                name="Administration"
                icon={<AdminIcon />}
                navChildren={[
                  { name: "Team mates", to: "/administration/team" },
                  { name: "Roles and privileges", to: "/administration/roles" },
                ]}
              />
              <NavItem to="/activity" name="Activity Log" icon={<ActivityIcon />} />
            </MenuListContainer>

            <Divider />

            <MenuListContainer>
              <NavItem to="/settings" name="Settings" icon={<SettingsIcon />} />
              <Logout />
            </MenuListContainer>
          </Box>
        </Container>
      </motion.div>
    </>
  );
};