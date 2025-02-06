import { Box, Stack, Typography, Button, Link } from "@mui/material";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import BusinessTransactionTable from "./components/BusinessTransactionTable";

export const BusinessTransactions = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get business details from the route state
  const businessDetails = location.state?.business;

  return (
    <Box>
      <Stack direction="column" spacing={5}>
        <Box sx={{ marginLeft: "200px", width: "100%", paddingRight: "20px" }}>
          <Typography sx={{ fontWeight: "800", fontSize: "1.4rem" }}>
            {businessDetails?.businessName || "Business Details"}
          </Typography>

          <Button
            onClick={() => navigate("/business")}
            variant="contained"
            sx={{
              display: "inline-flex",
              marginTop: "15px",
              borderRadius: "4px",
              background: "#FAFAFA",
              width: "89px",
              height: "29px",
              color: "black",
              textTransform: "capitalize",
              "&:hover": { background: "none" },
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
                display: "flex",
                gap: "200px",
                justifyContent: "center",
                padding: "30px 40px 0",
              }}
              color="#7C7A78"
            >
              <Typography variant="h5">Business Address</Typography>
              <Typography variant="h5">Contact's Name</Typography>
              <Typography variant="h5">Contact's Email</Typography>
              <Typography variant="h5">Contact's Phone No</Typography>
            </Box>

            <Box sx={{display: "flex", gap: "235px", justifyContent: "center", marginTop:'30px'
          }}>
              <Box>
              <Typography variant="h5">{businessDetails?.businessAddress}</Typography>
              </Box>
              <Box sx={{marginLeft:"-190px"}}> 
              <Typography variant="h5">{businessDetails?.contactName}</Typography>
              </Box>
              <Box sx={{marginLeft:"-130px"}}>
              <Typography variant="h5">{businessDetails?.businessEmail}</Typography>
              </Box>
              <Box>
              <Typography variant="h5">{businessDetails?.contactPhone}</Typography>
              </Box>

            </Box>
          </Box>

          <Typography variant="h2" marginTop={5}>
            Business Transaction Details
          </Typography>
        </Box>

        <BusinessTransactionTable />
      </Stack>
    </Box>
  );
};
