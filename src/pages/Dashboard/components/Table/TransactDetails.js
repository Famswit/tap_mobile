import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useNavigate } from 'react-router-dom';
import {Typography } from '@mui/material';

const options = [
  'More details',
  
];

const ITEM_HEIGHT = 48;

const TransactDetails = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const  navigate = useNavigate();

  return (
    <div>
      <IconButton
        onClick={handleClick}
      >
        <MoreHorizOutlinedIcon  />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
           <Typography onClick={()=>{navigate("/transactions/details")}}>{option}</Typography> 
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default TransactDetails;