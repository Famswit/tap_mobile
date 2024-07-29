import { Box, Stack, Typography, Button, styled, Link } from "@mui/material";
import { ExportIcon } from "../../assets/Icons/ExportIcon";

import DatePick from "./components/Date";
import DashboardTable from "../Dashboard/components/Table/DataTable";
import Search from "components/Search";

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

export const Transactions = () => {
  return (
    <Box sx={{ width: "100%", zIndex: "100" }}>
      <Stack direction="column" spacing={10} sx={{ marginTop: "-100px" }}>
        <Box
          sx={{
            marginLeft: "200px",
            paddingTop: "130px",
            width: "100%",
            paddingRight: "20px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignContent: "center" }}>
              <Typography sx={{ fontWeight: "800", fontSize: "1.4rem" }}>
                Transaction
              </Typography>
              <Search />
            </Box>
            <Box sx={{ marginTop: "-40px", display: "flex", gap: "10px" }}>
              <DatePick />
              <CsvButton
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
        </Box>

        <DashboardTable />
      </Stack>
    </Box>
  );
};
