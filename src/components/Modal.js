import * as React from "react";
import Box from "@mui/material/Box";
import MuiModal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "6px",
  p: 4,
};

export function Modal({ open, handleClose, children }) {
  return (
    <MuiModal open={open} onClose={handleClose}>
      <Box sx={style}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 0,
            top: -50,
            color: "#000",
            background: "#fff",
          }}
        >
          <CloseIcon />
        </IconButton>

        {children}
      </Box>
    </MuiModal>
  );
}
