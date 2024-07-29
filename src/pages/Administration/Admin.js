import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const AdminDropdownNav = () => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setOpen(!open);
    setActiveIndex(index);
  };

  const handleSubItemClick = (index) => {
    setActiveIndex(index);
    setOpen(true); // Ensure dropdown stays open when a sub-item is clicked
  };

  const handleNavItemClick = (index) => {
    setActiveIndex(index); // Reset activeIndex when a navigation item is clicked
  };

  return (
    <List>
      <ListItem
        button
        onClick={() => handleClick(0)}
        selected={activeIndex === 0}
        style={{ backgroundColor: activeIndex === 0 ? '#e0e0e0' : 'inherit' }}
      >
        <ListItemText primary="Dropdown Item 1" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            selected={activeIndex === 1}
            onClick={() => handleSubItemClick(1)}
            style={{ backgroundColor: activeIndex === 1 ? '#e0e0e0' : 'inherit' }}
          >
            <ListItemText primary="Sub Item 1" />
          </ListItem>
          <ListItem
            button
            selected={activeIndex === 2}
            onClick={() => handleSubItemClick(2)}
            style={{ backgroundColor: activeIndex === 2 ? '#e0e0e0' : 'inherit' }}
          >
            <ListItemText primary="Sub Item 2" />
          </ListItem>
          {/* Add more sub items here as needed */}
        </List>
      </Collapse>
      <ListItem
        button
        selected={activeIndex === 3}
        onClick={() => handleClick(3)}
        style={{ backgroundColor: activeIndex === 3 ? '#e0e0e0' : 'inherit' }}
        onClick={() => handleNavItemClick(3)} // Reset activeIndex when a navigation item is clicked
      >
        <ListItemText primary="Dropdown Item 2" />
      </ListItem>
      <ListItem
        button
        selected={activeIndex === 4}
        onClick={() => handleClick(4)}
        style={{ backgroundColor: activeIndex === 4 ? '#e0e0e0' : 'inherit' }}
        onClick={() => handleNavItemClick(4)} // Reset activeIndex when a navigation item is clicked
      >
        <ListItemText primary="Dropdown Item 3" />
      </ListItem>
      {/* Add more dropdown items here as needed */}
    </List>
  );
};

export default AdminDropdownNav;
