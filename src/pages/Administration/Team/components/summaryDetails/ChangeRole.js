import * as React from "react";
import { Box, Typography, Button, MenuItem, TextField, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { changeRoleValidation } from "schema/changeRoleValidation";
import { useUpdateRole } from "api/roles";


const RolesMenuOption = [
  
  {
    value: "business",
    label: "business",
  },
  {
    value: "technology",
    label: "technology",
  },
  {
    value: "Human resources",
    label: "Human resources",
  },
];

export default function ChangeRole({teamMate}) {
  const { mutate, isPending } = useUpdateRole();
  const { enqueueSnackbar } = useSnackbar();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  useFormik({
    initialValues: {
      roles: "",
    },
    validationSchema: changeRoleValidation,

    onSubmit: (values) => {
      mutate(
        { data: {  roles: values.roles } },
        {
          onError: (err) => {
            console.log({ err });
          },
          onSuccess: (res) => {
            if (res.status !== "error") {
              enqueueSnackbar("Login Successful", { variant: "success" });
            } else {
              enqueueSnackbar(res.message, { variant: "error" });
            }
          },
        }
      );
    },
  });
  return (
    <div>
      <Box sx={{ width: "312px", height: "264px" }}>
        <Typography
          variant="h2"
          sx={{ textAlign: "center", fontStyle: "normal", marginTop: "20px" }}
        >
         Change Role {teamMate.amount}
        </Typography>

        <Box sx={{marginTop:'30px', display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography variant="h4">Role</Typography>

        <TextField
        placeholder="select role"
          id="role"
          name="roles"
          value={values.roles}
          onChange={handleChange}               
          onBlur={handleBlur} 
          size="small"
          sx={{
            width: "100%",
            marginTop: "5px",
            boxShadow: "none",
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: "1px !important",
              borderColor: "#EBEDEF !important",
            },
          }}
          select
        >
          {RolesMenuOption.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {errors.roles && touched.roles && (
          <p style={{ color: "red" }}>{errors.roles}</p>
        )}
        </Box>

        <Button
         // LinkComponent={Link}
         // to="roles"
         type="submit"
         onClick={handleSubmit}
        disabled={isPending}
          variant="contained"
          sx={{ width: "100%", padding: "10px", marginTop: "50px" }}
        >
          Change role
          {isPending && (
            <CircularProgress
              size={18}
              color="primary"
              style={{ marginLeft: "10px" }}
            />
          )}
        </Button>
      </Box>
    </div>
  );
}
