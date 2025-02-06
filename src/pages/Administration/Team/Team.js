import { Box, Typography } from "@mui/material";

import TeamTable from "./components/TeamTable/TeamTable";
import Invite from "./components/Invite";
import Search from "components/Search";
import { useState } from "react";

export const Team = () => {
  const [teams, setTeams] = useState([
    { id: 1, fullname: "User 1", email: "user1@example.com", roles: "Admin", status: "Active" },
  ]);
  const handleInviteTeammate = (newTeammate) => {
    setTeams((prevTeams) => [newTeammate, ...prevTeams]);
  };
  const handleUpdate = (newTeammate) => {
    setTeams((prevTeams) => prevTeams.map(item => {
      if(item.id === newTeammate.id){
        return newTeammate
      }else{
        return item
      }
    }));
  };
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
          <Invite onInviteTeammate={handleInviteTeammate}/>
        </Box>
      </Box>
      <Box sx={{ marginTop: "70px" }}>
        <TeamTable team={teams}/>
      </Box>
    </Box>
  );
};
