import { Box, Stack, Typography, Button, Link } from "@mui/material";

import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import BusinessTransactionTable from "./components/BusinessTransactionTable";

export const BusinessTransactions = () => {
  return (
    <Box>
      <Stack direction="column" spacing={5}>
        <Box sx={{ marginLeft: "200px", width: "100%", paddingRight: "20px" }}>
          <Typography sx={{ fontWeight: "800", fontSize: "1.4rem" }}>
            Perry Holdings
          </Typography>
          <Button
            LinkComponent={Link}
            href="/business"
            variant="contained"
            sx={{
              display: "inline-flex",
              marginTop: "15px",
              borderRadius: "4px",
              background: "#FAFAFA",
              width: "89px",
              height: "29px",
              textDecoration: "none",
              textTransform: "capitalize",
              color: "black",
              "&:hover": {
                background: "none",
              },
            }}
          >
            <KeyboardArrowLeftOutlinedIcon />
            <Typography>Back</Typography>
          </Button>

          <Box
            sx={{
              width: "1170px",
              height: "108px",
              background: "#FAFAFA",
              borderRadius: "6px",
              marginTop: "50px",
            }}
          >
            <Box
              sx={{
                textAlign: "start",
                width: "100%",
                display: "inline-flex",
                gap: "185px",
                justifyContent: "center",
                padding: "30px 40px 0 ",
              }}
              color="#7C7A78"
            >
              <Typography variant="h5">Business Addresss</Typography>
              <Typography variant="h5">Contact's Name</Typography>
              <Typography variant="h5">Contact's Email</Typography>
              <Typography variant="h5">Contact's Phone No</Typography>
            </Box>
            <Box
              sx={{
                textAlign: "start",
                width: "100%",
                display: "inline-flex",
                gap: "210px",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5">6, Saki Close,</Typography>
              <Typography variant="h5">Edward Ariyo</Typography>
              <Typography variant="h5">Eddy@gmail.com</Typography>
              <Typography variant="h5">08123456096</Typography>
            </Box>
          </Box>

          <Typography variant="h2" marginTop={5}>
            Transaction Details
          </Typography>
        </Box>

        <BusinessTransactionTable />
      </Stack>
    </Box>
  );
};
