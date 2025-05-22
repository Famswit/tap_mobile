import React, { useState } from "react";
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
import { BusinessTransactions } from "./BusinessTransactions";

// Styled Export Button
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

export const LinkStyles = styled(Link)({
  color: "#fff",
  textDecoration: "none",
  width: "100%",
});

const ActionBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  marginTop: "-40px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "row", 
    marginTop: "50px",
    width: "100%", 
    justifyContent: "space-between", 
    marginLeft:"-350px"
  },
}));

export function Businesses() {
  const generateFakeData = () => {
    const categories = ["Retail", "Food", "Tech", "Health", "Education"];
    return Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      businessName: `Business ${index + 1}`,
      businessCategory: categories[Math.floor(Math.random() * categories.length)],
      businessEmail: `business${index + 1}@example.com`,
      dateAdded: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
    }));
  };

  const [businesses, setBusinesses] = useState(generateFakeData());
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [businessDetails, setBusinessDetails] = useState(null);

  const handleAddBusiness = (newBusiness) => {
    setBusinesses((prevBusinesses) => [newBusiness, ...prevBusinesses]);
  };

  const handleViewWithdrawalDetails = (business) => {
    setBusinessDetails(business);
  };

  const handleGenerateApiKey = (business) => {
    setSelectedBusiness(business);
  };

  return (
    <Stack direction="column" spacing={10}>
      <Box sx={{ width: "100%", paddingRight: "20px" }}>
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
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
          <ActionBox sx={{ marginTop: "-40px", display: "flex", gap: "20px" }}>
            <AddBusiness onAddBusiness={handleAddBusiness} />
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
          </ActionBox>
        </Box>
      </Box>

      <BusinessTable
        businesses={businesses}
        onViewWithdrawalDetails={handleViewWithdrawalDetails}
        onGenerateApiKey={handleGenerateApiKey}
      />
      <ApiKey
      open={Boolean(selectedBusiness)}
      business={selectedBusiness}
      handleClose={() => setSelectedBusiness(null)}
    />

    </Stack>
  );
}
