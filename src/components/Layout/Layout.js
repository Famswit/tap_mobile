import React from "react";
import { Box, Stack, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import Header from "./components/Header";
import { SideNav } from "./components/SideNav";

// Styled Components
const RootBox = styled(Box)(({ theme }) => ({
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    paddingBottom: "20px",
  },
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  zIndex: "1",
  width: "100%",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const LayoutStack = styled(Stack)(({ theme }) => ({
  direction: "row",
  spacing: 40,
  display: "flex", // Ensure flexbox is applied
  minHeight: "100vh", // Ensure the stack takes full height
  [theme.breakpoints.down("lg")]: {
    spacing: 30,
  },
  [theme.breakpoints.down("md")]: {
    spacing: 25,
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    spacing: 0,
    marginLeft: "0",
  },
}));

const SideNavContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  zIndex: "5",
  width: "260px", // Match SideNav's default width
  [theme.breakpoints.down("lg")]: {
    width: "220px",
  },
  [theme.breakpoints.down("md")]: {
    width: "200px",
  },
  [theme.breakpoints.down("sm")]: {
    position: "fixed",
    width: "200px",
  },
  [theme.breakpoints.down("xs")]: {
    width: "180px",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  width: "80%",
  position: "relative",
  paddingTop: "130px",
  marginLeft: "260px", 
  paddingLeft: "40px", 
  paddingRight: "40px",
  flexGrow: 1,
  [theme.breakpoints.down("lg")]: {
    marginLeft: "220px",
    paddingTop: "110px",
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  [theme.breakpoints.down("md")]: {
    marginLeft: "200px",
    paddingTop: "100px",
    paddingLeft: "25px",
    paddingRight: "25px",
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: "0", 
    paddingTop: "80px",
    paddingLeft: "16px",
    paddingRight: "16px",
    width: "100%",
  },
  [theme.breakpoints.down("xs")]: {
    paddingTop: "70px",
    paddingRight: "12px",
    paddingLeft: "12px",
  },
}));

// Animation variants
const contentVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      duration: 0.5,
    },
  },
};

const Layout = () => {
  return (
    <RootBox>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <LayoutStack>
        <SideNavContainer>
          <SideNav />
        </SideNavContainer>
        <ContentBox
          component={motion.div}
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          <Outlet />
        </ContentBox>
      </LayoutStack>
    </RootBox>
  );
};

export default Layout;