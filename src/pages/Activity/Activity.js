import { Box, Link, Stack, Typography, CircularProgress, styled } from "@mui/material";
import { useEffect, useState } from "react";

import { CsvButton } from "../Transaction/Transaction";
import { ExportIcon } from "assets/Icons/ExportIcon";
import Search from "components/Search";
import DatePick from "../Transaction/components/Date";
import ActivitiesMenu from "./components/ActivitiesMenu";
import ActivityTable from "./components/ActivitypageTable";

const mockActivityData = [
  {
    id: 1,
    activity: "User login",
    user: "john.doe@example.com",
    role: "Admin",
    status: "Success",
    date: "2025-04-11",
  },
  {
    id: 2,
    activity: "API key reset",
    user: "jane.doe@example.com",
    role: "Developer",
    status: "Success",
    date: "2025-04-10",
  },
  {
    id: 3,
    activity: "Role changed",
    user: "admin@example.com",
    role: "Admin",
    status: "Failed",
    date: "2025-04-09",
  },
  {
    id: 4,
    activity: "Invite teammate",
    user: "joshua@example.com",
    role: "Manager",
    status: "Success",
    date: "2025-04-09",
  },
  {
    id: 5,
    activity: "User logout",
    user: "paul@example.com",
    role: "Admin",
    status: "Success",
    date: "2025-04-08",
  },
];

const HeaderFlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "1rem",
  },
}));

const TitleSearchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignContent: "center",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const ActionBox = styled(Box)(({ theme }) => ({
  marginTop: "-40px",
  display: "flex",
  gap: "20px",
  [theme.breakpoints.down("md")]: {
    marginTop: "-35px",
    gap: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "0",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center", 
  },
  [theme.breakpoints.down("xs")]: {
    gap: "10px",
  },
}));

const StyledCsvButton = styled(CsvButton)(({ theme }) => ({
  height: "48px", 
  padding: "0 20px",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    height: "40px",
    padding: "0 14px",
    marginTop: "30px"
  },
  [theme.breakpoints.down("xs")]: {
    height: "36px",
    padding: "0 12px",
  },
}));

export const Activity = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActivityData(mockActivityData);
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      <Stack direction="column" spacing={10}>
        <Box sx={{ width: "100%", paddingRight: "20px" }}>
          <HeaderFlexBox>
            <TitleSearchBox>
              <Typography sx={{ fontWeight: "800", fontSize: "1.4rem" }}>
                Activity log
              </Typography>
              <Search />
            </TitleSearchBox>
            <ActionBox>
              <ActivitiesMenu />
              <DatePick />
              <StyledCsvButton
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
              </StyledCsvButton>
            </ActionBox>
          </HeaderFlexBox>
        </Box>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
            <CircularProgress />
          </Box>
        ) : (
          <ActivityTable data={activityData} />
        )}
      </Stack>
    </Box>
  );
};