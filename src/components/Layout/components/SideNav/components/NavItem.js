import React, { useState, useEffect } from "react";
import {
  ListItem,
  Collapse,
  styled,
  List,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { NavLink as RNavLink, useLocation } from "react-router-dom";

const NavLink = styled(RNavLink)({
  textDecoration: "none",
  color: "inherit",
});

export const MenuListitemContainer = styled(ListItem)({
  display: "flex",
  gap: "20px",
  marginBottom: "10px",
  cursor: "pointer",
  transition: "0.10s all ease-out",
  borderRadius: "4px",

  "&:hover": {
    backgroundColor: "#2D75B6 ",
    color: "#fff",
    borderRadius: "4px",
  },
});

export const NavItem = (props) => {
  const location = useLocation();
  const { name, icon, to, navChildren } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (navChildren) {
      const toPaths = navChildren.map((item) => item.to);
      const isActive = toPaths.includes(location.pathname);
      if (isActive) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  }, [location]);

  return !navChildren ? (
    <NavLink to={to}>
      {({ isActive }) => (
        <MenuListitemContainer
          sx={{
            color: isActive ? "#fff" : "#000",
            background: isActive ? "#2D75B6" : "",
          }}
        >
          {icon}
          <ListItemText primary={name} />
        </MenuListitemContainer>
      )}
    </NavLink>
  ) : (
    <>
      <MenuListitemContainer
        style={{
          backgroundColor: open ? "#2D75B6" : "",
          color: open ? "#fff" : "",
          "&:hover": {
            color: "#000",
          },
        }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText sx={{ marginLeft: "-32px" }} primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </MenuListitemContainer>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {navChildren.map((item) => (
            <NavLink to={item.to} style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <ListItem
                  sx={{
                    marginLeft: "40px",
                    color: isActive ? "#2D75B6" : "#000",
                    "&:hover": {
                      background: "none",
                    },
                  }}
                >
                  <ListItemText primary={item.name} />
                </ListItem>
              )}
            </NavLink>
          ))}
        </List>
      </Collapse>
    </>
  );
};
