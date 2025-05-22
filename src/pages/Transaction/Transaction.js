import {
  Box,
  Stack,
  Typography,
  Button,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ExportIcon } from "../../assets/Icons/ExportIcon";
import { motion } from "framer-motion";

import DatePick from "./components/Date";
import DashboardTable from "../Dashboard/components/Table/DataTable";
import Search from "components/Search";

export const CsvButton = styled(Button)(({ theme }) => ({
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
  [theme.breakpoints.down("sm")]: {
    marginTop: "0", 
    width: "48%",
    height: "40px",
  },
  [theme.breakpoints.down("xs")]: {
    width: "48%",
    height: "36px",
  },
}));

const TitleSearchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.down("sm")]: {
    width: "100%", 
    justifyContent: "space-between", 
  },
}));

const ActionBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  marginTop: "-40px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "row", 
    marginTop: "10px",
    width: "100%", 
    justifyContent: "space-between", 
  },
}));

export const Transactions = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ width: "100%", zIndex: 100 }}>
      <Stack
        direction="column"
        spacing={6}
        sx={{ marginTop: isMobile ? "0px" : "-100px", paddingX: isMobile ? "1rem" : "0" }}
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Box
          sx={{
            marginLeft: isMobile ? "0px" : "200px",
            paddingTop: isMobile ? "90px" : "130px",
            paddingRight: isMobile ? "0px" : "20px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              gap: isMobile ? "1rem" : "0",
            }}
          >
            <TitleSearchBox>
              <Typography
                sx={{ fontWeight: "800", fontSize: isMobile ? "1.2rem" : "1.4rem" }}
              >
                Transactions View
              </Typography>
              <Search />
            </TitleSearchBox>

            <ActionBox>
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
            </ActionBox>
          </Box>
        </Box>

        {/* Table */}
        <DashboardTable />
      </Stack>
    </Box>
  );
};