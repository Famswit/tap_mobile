import { Box } from "@mui/system";
import { IconButton, InputAdornment, TextField } from "@mui/material";

import { SearchIcon } from "assets/Icons/SearchIcon";

const Search = () => {
  return (
    <Box sx={{ marginTop: "-10px" }}>
      <TextField
        placeholder="search"
        sx={{
          width: "233px",
          height: "46px",
          padding: "11px 25px",
          borderRadius: "8px",
          border: "1.5px #EFF1F4",
        }}
        size="small"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Search;
