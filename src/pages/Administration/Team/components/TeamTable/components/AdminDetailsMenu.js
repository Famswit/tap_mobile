import * as React from "react";

import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Menu, MenuItem, IconButton } from "@mui/material";

import { useNavigate } from "react-router-dom";


const ITEM_HEIGHT = 48;

export default function AdmindataDetailsMenu({ handleOpenMoreDetails }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizOutlinedIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleOpenMoreDetails();
          }}
        >
          More Details
        </MenuItem>
      </Menu>
    </div>
  );
}
