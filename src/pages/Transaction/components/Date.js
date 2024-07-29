import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Typography, styled } from "@mui/material";
import { DateIcon } from '../../../assets/Icons/DateIcon';



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

const DatePick =() => {

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
        <DateIcon />

        <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color:'#213336', width:'120px', textTransform:"capitalize"}}
      >
        <Typography variant="h4">Select Date</Typography> 
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
        <MenuItem sx={{fontSize:'11px', fontWeight:'400'}} onClick={handleClose}>Today</MenuItem>
        <MenuItem sx={{fontSize:'11px', fontWeight:'400'}} onClick={handleClose}>This week</MenuItem>
        <MenuItem sx={{fontSize:'11px', fontWeight:'400'}} onClick={handleClose}>Last 30 days</MenuItem>
        <MenuItem sx={{fontSize:'11px', fontWeight:'400'}} onClick={handleClose}>Last 90 days</MenuItem>
        <MenuItem sx={{fontSize:'11px', fontWeight:'400'}} onClick={handleClose}>Custom Date</MenuItem>


      </Menu>
    </div>

  </DateButton>  );
}

export default DatePick;