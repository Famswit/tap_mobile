import { Box, Button, Typography, styled, Link } from "@mui/material";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";

import { ExportIcon } from "assets/Icons/ExportIcon";
import TransactTable from "./components/TransactTable";

export const CsvButton = styled(Button)({
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

export const TransactionDetails = () => {
  return (
    <Box sx={{ width: "100%", paddingRight: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignContent: "center" }}>
          <Typography sx={{ fontWeight: "800", fontSize: "1.4rem" }}>
            #199-238-2953
          </Typography>
        </Box>
        <Box sx={{ marginTop: "-40px", display: "flex", gap: "20px" }}>
          <CsvButton
            LinkComponent={Link}
            href="/"
            variant="contained"
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
          </CsvButton>
        </Box>
      </Box>

      <Button
        LinkComponent={Link}
        href="/dashboard"
        sx={{
          width: "89px",
          height: "29px",
          borderRadius: "4px",
          background: "#FAFAFA",
          textDecoration: "none",
          textTransform: "capitalize",
          color: "black",
          display: "flex",
          gap: "5px",
          alignItems: "center",
          "&:hover": {
            backgroundColor: "#FAFAFA",
          },
        }}
        variant="contained"
      >
        <KeyboardArrowLeftOutlinedIcon />
        <Typography>Back</Typography>
      </Button>

      <Typography sx={{ marginTop: "40px", marginBottom: "60px" }} variant="h2">
        Total Amount: #4,000,000.00
      </Typography>

      <TransactTable />
    </Box>
  );
};
