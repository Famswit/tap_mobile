import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  styled,
  Link,
  InputAdornment,
  TextField,
  IconButton,
} from "@mui/material";

import { ExportIcon } from "assets/Icons/ExportIcon";
import { SearchIcon } from "assets/Icons/SearchIcon";
import { ApiKey } from "./components/ApiKey/ApiKey";
import { BusinessTable } from "./components/BusinessTable";
import { AddBusiness } from "./components/AddBusiness/AddBusiness";
import { useGETBusinesses } from "api/business";


export const ExportButton = styled(Button)({
  marginTop: "35px",
  width: "169px",
  height: "48px",
  backgroundColor: "#fff",
  textAlign: "center",
  display: "flex",
  border: "1.5px solid #EFF1F4",
  boxShadow: "none",

  "&:hover": {
    backgroundColor: "#cfd8dc",
  },
});

export const ButtonStyles = styled(Button)({
  marginTop: "35px",
  width: "344px",
  height: "48px",
  backgroundColor: "#3f50b5",
  textAlign: "center",
  "&:hover": {
    backgroundColor: "#2D75B6",
  },
});

export const LinkStyles = styled(Link)({
  color: "#fff",
  textdecoration: "none",
  width: "100%",

  "&:hover": {},
});

export function Businesses() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [OpenAddBusiness, setOpenAddBusiness] = useState(false);
  const open = Boolean(OpenAddBusiness);

 

  return (
    <Stack direction="column" spacing={10}>
      <Box
        sx={{
          width: "100%",
          paddingRight: "20px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignContent: "center" }}>
            <Typography sx={{ fontWeight: "800", fontSize: "1.4rem" }}>
              Businesses
            </Typography>
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
          </Box>
          <Box sx={{ marginTop: "-40px", display: "flex", gap: "20px" }}>
            <AddBusiness />
            <ExportButton variant="contained">
              <LinkStyles
                href="/"
                variant="h4"
                sx={{
                  textDecoration: "none",
                  textTransform: "capitalize",
                  color: "black",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <ExportIcon />
                <Typography>Export csv</Typography>
              </LinkStyles>
            </ExportButton>
          </Box>
        </Box>
      </Box>
      <BusinessTable
        onSelectBusiness={(business) => {
          setSelectedBusiness(business);
        }}
      />
      <ApiKey
        open={Boolean(selectedBusiness)}
        business={selectedBusiness}
        handleClose={() => setSelectedBusiness(null)}
      />
    </Stack>
  );
}
