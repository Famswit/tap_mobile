import {
  TextField as MuiTextField,
  styled,
  FormControl,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";

const TextField = styled(MuiTextField)({
  borderRadius: "4px",

  "& .MuiOutlinedInput-notchedOutline": {
    borderWidth: "1px !important",
    borderColor: "#EBEDEF !important",
  },
});

export function TextInput({ label, ...restProps }) {
  const [showPassword, setShowPassword] = useState(false);

  const EndAdorment = ({ visible, setVisible }) => {
    return (
      <InputAdornment position="end">
        <Typography
          variant="h4"
          sx={{ cursor: "pointer" }}
          onClick={() => setVisible(!visible)}
        >
          {showPassword ? "Hide" : "Show"}
        </Typography>
      </InputAdornment>
    );
  };
  return (
    <FormControl sx={{ width: "100%" }}>
      {Boolean(label) && (
        <Typography component="label" htmlFor={restProps.id} variant="h3">
          {label}
        </Typography>
      )}
      <TextField
        size="small"
        {...restProps}
        type={showPassword ? "text" : restProps.type}
        InputProps={{
          ...(restProps.type === "password" && {
            endAdornment: (
              <EndAdorment
                visible={showPassword}
                setVisible={setShowPassword}
              />
            ),
          }),
          ...restProps.InputProps,
        }}
      />
    </FormControl>
  );
}
