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

export const HeaderBar = styled(AppBar)({
  width: "1440px",
  height: "80px",
  background: "#ffff",
  boxShadow: "none",
  display: "flex",
  justifyContent: "space-between",
});
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
      <Box sx={{ flexGrow: 1 }}>
        <HeaderBar position="static">
          <Toolbar>
            <Typography
              variant="h2"
              component="div"
              sx={{ flexGrow: 1, color: "#000" }}
            ></Typography>

            <Box sx={{ display: "flex", gap: "5px", marginRight: "-50px" }}>
              <Avatar
                sx={{
                  bgcolor: "#F0E9E9",
                  width: "32px",
                  height: "32px",
                  marginTop: "25px",
                  fontSize: ".9rem",
                  color: "#8B5C5D",
                }}
              >
                OP
              </Avatar>
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ marginTop: "25px", color: "#213336" }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontSize: "14px", textTransform: "capitalize" }}
                  >
                    Admin name
                  </Typography>
                  <KeyboardArrowDownIcon />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </div>
            </Box>
          </Toolbar>
        </HeaderBar>
        <Divider />
      </Box>
  );
}
