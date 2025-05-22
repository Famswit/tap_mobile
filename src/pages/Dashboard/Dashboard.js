import React from "react";
import {
  Box,
  Typography,
  Paper,
  styled,
  Radio,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import DashboardTable from "./components/Table/DataTable";

// Styled card component
export const CardContainer = styled(Paper)({
  width: "100%",
  height: "117px",
  boxShadow: "0px 1px 12px 0px rgba(21, 41, 82, 0.03)",
  borderRadius: "10px",
  border: "1px solid #F1F0F5",
  background: "#FFF",
  padding: "1rem",
});

// Animation variant
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      type: "spring",
    },
  }),
};

export const Dashboard = () => {
  const cardData = [
    { label: "Total Businesses", value: "56", variant: "h1" },
    { label: "Total Revenue", value: "NGN 120,000,000", variant: "h2" },
    { label: "Daily Revenue", value: "NGN 2,500,000", variant: "h2" },
    { label: "Monthly Revenue", value: "NGN 3,200,000", variant: "h2" },
  ];

  return (
    <Box sx={{ width: "100%", zIndex: 100, paddingBottom: "2rem" }}>
      <Typography
        sx={{
          marginBottom: "30px",
          fontWeight: "800",
          fontSize: { xs: "1.2rem", sm: "1.4rem" },
        }}
      >
        Welcome Back Josh,
      </Typography>

      <Grid container spacing={3}>
        {cardData.map((card, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <motion.div
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <CardContainer>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <Typography variant="h5">{card.label}</Typography>
                  <FormControlLabel
                    value="radio"
                    sx={{ marginTop: "-10px" }}
                    disabled
                    control={<Radio />}
                  />
                </Box>
                <Typography variant={card.variant}>{card.value}</Typography>
              </CardContainer>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: "40px" }}>
        <DashboardTable />
      </Box>
    </Box>
  );
};
