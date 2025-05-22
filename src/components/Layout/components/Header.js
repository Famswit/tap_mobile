import React from "react";
import {
  Avatar,
  Divider,
  Box,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  styled,
  AppBar,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const HeaderBar = styled(AppBar)(({ theme }) => ({
  width: "1440px",
  height: "80px",
  background: "#ffff",
  boxShadow: "none",
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    padding: "0 16px",
  },
  [theme.breakpoints.down("md")]: {
    height: "70px",
    padding: "0 12px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "60px",
    padding: "0 8px",
  },
  [theme.breakpoints.down("xs")]: {
    height: "56px",
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    padding: "0 4px",
    minHeight: "56px",
  },
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "5px",
  marginRight: "-50px",
  [theme.breakpoints.down("md")]: {
    marginRight: "-20px",
    gap: "4px",
  },
  [theme.breakpoints.down("sm")]: {
    marginRight: "-10px",
    gap: "3px",
  },
  [theme.breakpoints.down("xs")]: {
    marginRight: "0",
    gap: "2px",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "25px",
  color: "#213336",
  [theme.breakpoints.down("md")]: {
    marginTop: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "15px",
    padding: "4px",
  },
  [theme.breakpoints.down("xs")]: {
    marginTop: "12px",
    padding: "2px",
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  textTransform: "capitalize",
  [theme.breakpoints.down("md")]: {
    fontSize: "13px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "11px",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  bgcolor: "#F0E9E9",
  width: "32px",
  height: "32px",
  marginTop: "25px",
  fontSize: ".9rem",
  color: "#8B5C5D",
  [theme.breakpoints.down("md")]: {
    width: "28px",
    height: "28px",
    marginTop: "20px",
    fontSize: ".85rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: "24px",
    height: "24px",
    marginTop: "15px",
    fontSize: ".8rem",
  },
  [theme.breakpoints.down("xs")]: {
    width: "20px",
    height: "20px",
    marginTop: "12px",
    fontSize: ".75rem",
  },
}));

// Animation variants
const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.5,
    },
  },
};

const avatarVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.3,
    },
  },
};

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2 },
  },
};

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <Box sx={{ flexGrow: 1 }}>
        <HeaderBar position="static">
          <StyledToolbar>
            <Typography
              variant="h2"
              component="div"
              sx={{ flexGrow: 1, color: "#000" }}
            ></Typography>

            <AvatarContainer
              component={motion.div}
              variants={avatarVariants}
              initial="hidden"
              animate="visible"
            >
              <StyledAvatar>OP</StyledAvatar>
              <div>
                <StyledButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <StyledTypography variant="h5">
                    Admin name
                  </StyledTypography>
                  <KeyboardArrowDownIcon />
                </StyledButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                    component: motion.ul,
                    initial: "hidden",
                    animate: open ? "visible" : "hidden",
                    variants: menuVariants,
                  }}
                >
                  <MenuItem
                    onClick={handleClose}
                    component={motion.li}
                    variants={menuItemVariants}
                    component ={Link}
                    to='/settings'
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={motion.li}
                    variants={menuItemVariants}
                    component ={Link}
                    to='/dashboard'
                  >
                    My account
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={motion.li}
                    variants={menuItemVariants}
                    component ={Link}
                    to='/login'
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </AvatarContainer>
          </StyledToolbar>
        </HeaderBar>
        <Divider />
      </Box>
    </motion.div>
  );
}