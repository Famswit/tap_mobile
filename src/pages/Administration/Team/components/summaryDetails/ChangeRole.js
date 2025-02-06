import * as React from "react";
import { Box, Typography, Button, MenuItem, TextField, CircularProgress } from "@mui/material";

import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { changeRoleValidation } from "schema/changeRoleValidation";
import { useUpdateRole } from "api/roles";
import { useState } from "react";


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

export default function ChangeRole({ teamMate, handleRoleChange }) {
  const [selectedRole, setSelectedRole] = useState(teamMate.roles);

  const { mutate, isPending } = useUpdateRole();
  const { enqueueSnackbar } = useSnackbar();


  const handleSubmit = (e) => {
    e.preventDefault();
    handleRoleChange({ ...teamMate, roles: formik.values.roles });
  };

  const formik = useFormik({
    initialValues: {
      roles: teamMate.roles,
    },
    validationSchema: changeRoleValidation,
    onSubmit: (values) => {
      mutate(
        { data: { roles: values.roles }, id: teamMate.id },
        {
          onSuccess: () => {
            enqueueSnackbar("Role updated successfully", { variant: "success" });
            handleRoleChange({ ...teamMate, roles: values.roles });
          },
          onError: () => {
            enqueueSnackbar("Error updating role", { variant: "error" });
          },
        }
      );
    },
  });

  return (
    <Box sx={{ width: "312px", height: "264px" }}>
      <Typography variant="h2" sx={{ textAlign: "center", marginTop: "20px" }}>
        Change Role for {teamMate.fullname}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginTop: '30px', display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography variant="h4">Role</Typography>
          <TextField
            id="roles"
            name="roles"
            select
            value={formik.values.roles}
            onChange={formik.handleChange}
            size="small"
            sx={{ width: "100%", marginTop: "5px" }}
          >
            {RolesMenuOption.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {formik.errors.roles && formik.touched.roles && (
            <Typography color="error">{formik.errors.roles}</Typography>
          )}
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "100%", padding: "10px", marginTop: "50px" }}
          disabled={isPending}
        >
          Change Role
          {isPending && <CircularProgress size={18} style={{ marginLeft: "10px" }} />}
        </Button>
      </form>
    </Box>
  );
}
