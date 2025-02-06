import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;

export const BusinessMenuOption = ({ business, onGenerateApiKey }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const options = [
    {
      name: "View withdrawal details",
      onClick: () => {
        navigate("/business/businesstransact", { state: { business } }); // Pass business as state
        handleClose();
      },
    },
    {
      name: "Generate API key",
      onClick: () => {
        onGenerateApiKey(business);
        handleClose();
      },
    },
  ];

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreHorizOutlinedIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem
            key={option.name}
            onClick={option.onClick}
            sx={{
              "&:hover": {
                backgroundColor: "#fff",
              },
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
