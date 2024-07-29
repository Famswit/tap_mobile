import * as React from 'react';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Typography, styled } from "@mui/material";

import { ActbuttonIcon } from '../../../assets/Icons/ActbuttonIcon';



export const DateButton = styled(Button)({
  marginTop:"35px",
  width: "169px",
  height: "48px",
  backgroundColor: "#fff",
  textAlign:"center",
  display:'flex',    
  border: '1.5px solid #EFF1F4',
  boxShadow:'none',

  "&:hover":{
    backgroundColor: '#cfd8dc',
 }

 })

const ActivitiesMenu =() => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <DateButton variant="contained">
    <ActbuttonIcon />

        <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color:'#213336', width:'120px', textTransform:"capitalize"}}
      >
        <Typography variant="h4">Activities</Typography> 
        <KeyboardArrowDownIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        
      >
        <MenuItem sx={{fontSize:'11px', fontWeight:'400'}} onClick={handleClose}>All</MenuItem>
        <MenuItem sx={{fontSize:'11px', fontWeight:'400'}} onClick={handleClose}>Staff Login</MenuItem>
        <MenuItem sx={{fontSize:'11px', fontWeight:'400'}} onClick={handleClose}>Password Change</MenuItem>
        <MenuItem sx={{fontSize:'11px', fontWeight:'400'}} onClick={handleClose}>Create role</MenuItem>
        <MenuItem sx={{fontSize:'11px', fontWeight:'400'}} onClick={handleClose}>Change role</MenuItem>
        <MenuItem sx={{fontSize:'11px', fontWeight:'400'}} onClick={handleClose}>Generate API key</MenuItem>
        <MenuItem sx={{fontSize:'11px', fontWeight:'400'}} onClick={handleClose}>Regenerate API key</MenuItem>


      </Menu>
    </div>

  </DateButton>  );
}

export default ActivitiesMenu;