import * as React from "react";
import {
  Button,
  Typography,
  Avatar,
  Link,
  Box,
  ListItemText,
} from "@mui/material";

import { LogoutWhiteIcon } from "assets/Icons/LogoutWhite";
import { Modal } from "components/Modal";
import { LogoutIcon } from "assets/Icons/LogoutIcon";
import { MenuListitemContainer } from "./NavItem";

export default function Logout() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.reload()
  };

  return (
    <>
      <MenuListitemContainer onClick={handleOpen}>
        <LogoutIcon />
        <ListItemText primary="Logout" />
      </MenuListitemContainer>

      <Modal open={open} handleClose={handleClose}>
        <Box sx={{ width: "412px", height: "364px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Avatar sx={{ width: "52px", height: "52px", bgcolor: "#D24339" }}>
              <LogoutWhiteIcon
                fontSize="large"
                sx={{ width: "24px", height: "24px" }}
              />
            </Avatar>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h2" sx={{ marginTop: "25px" }}>
              Log out
            </Typography>
            <Typography variant="h5" sx={{ marginTop: "15px" }}>
              Are you sure you want to log out?
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              width: "100%",
              padding: "10px",
              background: "#FC6250",
              color: "#fff",
              marginTop: "50px",
              textDecoration: "none",
              textTransform: "capitalize",
            }}
          >
            Yes, Log out
          </Button>

          <Button
            LinkComponent={Link}
            variant="outlined"
            sx={{
              width: "100%",
              padding: "10px",
              marginTop: "30px",
              borderRadius: "4px",
              border: "1px solid #2D75B6",
              textDecoration: "none",
              textTransform: "capitalize",
              color: "#2D75B6",
            }}
          >
            No, cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
}
