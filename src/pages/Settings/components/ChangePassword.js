import { Box, Stack, Typography, Button, CircularProgress } from "@mui/material";
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import { TextInput } from 'components/TextInput';
import { changePasswordValidation } from "schema/changePasswordValidation";
import { useChangePasswordProfile } from "api/settings";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useChangePasswordProfile();
  const { enqueueSnackbar } = useSnackbar();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: changePasswordValidation,

      onSubmit: (values) => {
        mutate(
          { data: { currentPassword: values.currentPassword, newPassword: values.newPassword, confirmPassword: values.confirmPassword } },
          
          {
            onError: (err) => {
              console.log({ err });
            },
            onSuccess: (res) => {
              if (res.status !== "error") {
                sessionStorage.setItem('token', res.data.token);
                enqueueSnackbar("Password change successful", { variant: "success" });
                navigate("/login");
              } else {
                enqueueSnackbar(res.message, { variant: "error" });
              }
            },
          }
        );
      }
    });

  return (
    <Stack
      spacing={3}
      sx={{
        margin: { xs: "0 10px", sm: "-10px 20px", md: "-10px 30px" },
      }}
    >
      <Box>
        <Typography variant="h4">Current password</Typography>
        <TextInput
          id="currentPassword"
          type="password"
          value={values.currentPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          size="small"
          sx={{
            width: { xs: "90%", sm: "90%", md: "500px" }, 
            borderRadius: "4px",
            border: "1px solid #EBEDEF",
          }}
        />
        {errors.currentPassword && touched.currentPassword && (
          <p style={{ color: "red" }}>{errors.currentPassword}</p>
        )}
      </Box>

      <Box>
        <Typography variant="h4">New password</Typography>
        <TextInput
          id="newPassword"
          type="password"
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          size="small"
          sx={{
            width: { xs: "90%", sm: "90%", md: "500px" }, 
            borderRadius: "4px",
            border: "1px solid #EBEDEF",
          }}
        />
        {errors.newPassword && touched.newPassword && (
          <p style={{ color: "red" }}>{errors.newPassword}</p>
        )}
      </Box>

      <Box>
        <Typography variant="h4">Confirm new password</Typography>
        <TextInput
          id="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          size="small"
          sx={{
            width: { xs: "90%", sm: "90%", md: "500px" },
            borderRadius: "4px",
            border: "1px solid #EBEDEF",
          }}
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword}</p>
        )}
      </Box>

      <Button
        onClick={handleSubmit}
        disabled={isPending}
        sx={{
          width: { xs: "90%", sm: "90%", md: "500px" }, 
          textDecoration: "none",
          textTransform: "capitalize",
        }}
        variant="contained"
        LinkComponent={Link}
        href="/settings"
      >
        Save change
        {isPending && (
          <CircularProgress
            size={18}
            color="primary"
            style={{ marginLeft: "10px" }}
          />
        )}
      </Button>
    </Stack>
  );
};