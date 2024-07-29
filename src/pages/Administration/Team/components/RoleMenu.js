import * as React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const currencies = [
  {
    value: 'USD',
    label: 'Select business',
  },
  {
    value: 'EUR',
    label: 'Business',
  },
  {
    value: 'BTC',
    label: 'Tech',
  },
  {
    value: 'JPY',
    label: 'Human resources',
  },
];

export default function RoleMenu() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {  width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
        placeholder='Select role'
        size='small'
          id="outlined-select-currency"
          select
          defaultValue="USD"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      
      </div>
      
      <div>
       
       
      </div>
    </Box>
  );
}