import * as React from "react";
import { Box, Button, Typography, ButtonBase } from "@mui/material";

import { useSnackbar } from "notistack";

import { CopyIcon } from "assets/Icons/CopyIcon";
import { useCopyAPIKey } from "api/business";

export const CopyApiKey = ({ textToCopy, business, handleOpenResetApiKey }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading, isError } = useCopyAPIKey(business?.businessId);

  console.log(data)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }
  const handleCopyText = async () => {
    const apiKey = data?.data?.apiKey?.apiKey;
    if(apiKey){
      try {
        await navigator.clipboard.writeText(apiKey);
        enqueueSnackbar("Text copied to clipboard", { variant: "success" });
      } catch (error) {
        enqueueSnackbar("Failed to copy API Key", { variant: "error" });
        console.error("Failed to copy API Key:", error);
      }
    };
    }
  

  return (
    <Box sx={{ width: "412px", height: "325px" }}>
      <Typography
        variant="h2"
        sx={{ textAlign: "center", fontStyle: "normal" }}
      >
        API Key
      </Typography>
      <Box sx={{ padding: "60px 0px 0px" }}>
        <Button
          sx={{
            color: "#000",
            borderRadius: "3px",
            height: "65px",
            width: "100%",
            border: "1px solid var(--Colours-Greys-Soap-200, #EBEDEF)",
            background: "var(--Colours-Greys-Soap-100, #F9FAFA)",
          }}
        >
          <Typography variant="h4">{data?.data?.apiKey?.apiKey || 'No data'}</Typography>
        </Button>
      </Box>
      <ButtonBase
        disableRipple
        onClick={handleOpenResetApiKey}
        sx={{
          float: "right",
          textDecoration: "underline",
          marginTop: "10px",
        }}  
      >
        <Typography variant="h4">Reset API Key</Typography>
      </ButtonBase>

      <Button
        variant="contained"
        sx={{ width: "100%", marginTop: "70px", padding: "10px" }}
        onClick={handleCopyText}
      >
        <Typography variant="h4"> Copy API Key</Typography>
        <CopyIcon />
      </Button>
    </Box>
  );
};
