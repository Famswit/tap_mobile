import { Box, Link, Stack, Typography } from "@mui/material";

import { CsvButton } from "../Transaction/Transaction";
import { ExportIcon } from "assets/Icons/ExportIcon";

import Search from "components/Search";
import DatePick from "../Transaction/components/Date";
import ActivityTable from "./components/ActivitypageTable";
import ActivitiesMenu from "./components/ActivitiesMenu";

export const Activity = () => {
  return (
    <Box>
      <Stack direction="column" spacing={10}>
        <Box sx={{ width: "100%", paddingRight: "20px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignContent: "center" }}>
              <Typography sx={{ fontWeight: "800", fontSize: "1.4rem" }}>
                Activity log
              </Typography>
              <Search />
            </Box>
            <Box sx={{ marginTop: "-40px", display: "flex", gap: "20px" }}>
              
                <ActivitiesMenu />
            
              <DatePick />
              <CsvButton
                variant="contained"
                LinkComponent={Link}
                href="/"
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
        <ActivityTable />
      </Stack>
    </Box>
  );
};
