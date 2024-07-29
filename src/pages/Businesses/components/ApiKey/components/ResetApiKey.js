import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, Button, CircularProgress } from "@mui/material";

import { NoticeIcon } from "assets/Icons/NoticeIcon";
import { TextInput } from "components/TextInput";
import { resetAPIValidation } from "schema/resetAPIValidation";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useResetAPI } from "api/business";

export function ResetApiKey({ handleClose, business }) {
  const token = ""
  const { mutate, isPending } = useResetAPI(token);
  const { enqueueSnackbar } = useSnackbar();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        resetReason: "",
        password: "",
      },
      validationSchema: resetAPIValidation,

      onSubmit: (values) => {
        mutate(
          { data: { resetReason: values.resetReason, password: values.password } },
          {
            onError: (err) => {
              console.log({ err });
            },
            onSuccess: (res) => {
              if (res.status !== "error") {
                sessionStorage.setItem('token', res.data.token);
                enqueueSnackbar("Reset Successful", { variant: "success" });
              } else {
                enqueueSnackbar(res.message, { variant: "error" });
              }
            },
          }
        );
      },
    });
  return (
    <Box sx={{ width: "412px", height: "471px" }}>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          fontStyle: "normal",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Reset API Key
      </Typography>
      <Box sx={{ padding: "50px 0 30px" }}>
        <Button
          sx={{
            borderRadius: "3px",
            width: "100%",
            height: "69px",
            border: "1px solid var(--Colours-Greys-Soap-200, #EBEDEF)",
            background: "var(--Colours-Greys-Soap-100, #F9FAFA)",
            display: "flex",
            gap: "20px",
          }}
        >
          <NoticeIcon />
          <Typography
            variant="h5"
            sx={{
              textAlign: "start",
              textTransform: "lowercase",
              color: "#000",
            }}
          >
            This action will deactivate your current API key and immediately
            generate a new one
          </Typography>
        </Button>
      </Box>
      <Box sx={{ marginTop: "-30px" }}>
        <TextInput label="why do you want to reset your API key?"
          value={values.resetReason}
          onChange={handleChange}
          id="resetReason"
          onBlur={handleBlur} />
          {errors.resetReason && touched.resetReason && (
            <p style={{ color: "red" }}>{errors.resetReason}</p>
          )}
      </Box>

      <Box>
        <TextInput
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          label="Enter password to confirm this action"
          id="password"
        /> {errors.password && touched.password && (
          <p style={{ color: "red" }}>{errors.password}</p>
        )}
      </Box>

      <Button
        variant="contained"
        disabled={isPending}
        onClick={handleSubmit}
        sx={{ marginTop: "60px", width: "100%", padding: "15px" }}
      >
        <Typography variant="h4"> Reset API Key</Typography>
        {isPending && (
          <CircularProgress
            size={18}
            color="primary"
            style={{ marginLeft: "10px" }}
          />
        )}
      </Button>
    </Box>
  );
}
