import { Box, Typography } from "@mui/material";

import TeamTable from "./components/TeamTable/TeamTable";
import Invite from "./components/Invite";
import Search from "components/Search";

export const Team = () => {
  return (
    <Box sx={{ width: "100%", paddingRight: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignContent: "center" }}>
          <Typography sx={{ fontWeight: "800", fontSize: "1.4rem" }}>
            Team mates
          </Typography>
          <Search />
        </Box>
        <Box sx={{ marginTop: "-40px", display: "flex", gap: "20px" }}>
          <Invite />
        </Box>
      </Box>
      <Box sx={{ marginTop: "70px" }}>
        <TeamTable />
      </Box>
    </Box>
  );
};
