import React from "react";
import { Checkbox, Typography, Button, Box } from "@mui/material";
import { Modal } from "components/Modal";
import { TextInput } from "components/TextInput";
import { useFormik } from "formik";
import { createRoleValidation } from "schema/createRoleValidation";

export default function CreateRole({ onAddRole }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      roleName: "",
      canViewTransaction: false,
      canExportTransaction: false,
      canViewBusinesses: false,
      canGenerateApiKey: false,
      canViewWithdrawalDetails: false,
      canAddNewBusinesses: false,
      canExportBusinesses: false,
      canInviteNewMember: false,
      canRemoveExistingMember: false,
      canCreateRole: false,
      canChangeRole: false,
    },
    validationSchema: createRoleValidation,
    onSubmit: (values) => {
      // Collect selected permissions as an array of labels
      const selectedPermissions = Object.entries(values)
        .filter(([key, value]) => key.startsWith("can") && value)
        .map(([key]) => key);

      // Pass role data back to the parent
      onAddRole({
        name: values.roleName,
        permissions: selectedPermissions,
        avatar: values.roleName.charAt(0).toUpperCase(), // First letter of roleName
        lastModified: new Date().toLocaleString(),
      });
      handleClose();
    },
  });

  const permissions = [
    { name: "canViewTransaction", label: "Can view transaction" },
    { name: "canExportTransaction", label: "Can export transaction" },
    { name: "canViewBusinesses", label: "Can view businesses" },
    { name: "canGenerateApiKey", label: "Can generate API key" },
    { name: "canViewWithdrawalDetails", label: "Can view withdrawal details" },
    { name: "canAddNewBusinesses", label: "Can add new businesses" },
    { name: "canExportBusinesses", label: "Can export businesses" },
    { name: "canInviteNewMember", label: "Can invite new member" },
    { name: "canRemoveExistingMember", label: "Can remove existing member" },
    { name: "canCreateRole", label: "Can create role" },
    { name: "canChangeRole", label: "Can change role" },
  ];

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" sx={{ textTransform: "capitalize", marginTop: "30px" }}>
        Create custom role
      </Button>

      <Modal open={open} handleClose={handleClose}>
        <Box sx={{ width: "412px", height: "650px", overflow: "auto" }}>
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            Create role
          </Typography>

          <TextInput
            label="What do you want to call this role?"
            placeholder="Customer support"
            id="roleName"
            value={formik.values.roleName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.roleName && formik.touched.roleName && (
            <Typography color="error">{formik.errors.roleName}</Typography>
          )}

          <Box>
            <Typography variant="h4" sx={{ paddingTop: "20px", color: "#BABABA" }}>
              Permissions
            </Typography>
            {permissions.map((permission) => (
              <Box key={permission.name} sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  name={permission.name}
                  checked={formik.values[permission.name]}
                  onChange={formik.handleChange}
                />
                <Typography variant="h5">{permission.label}</Typography>
              </Box>
            ))}

            <Button
              variant="contained"
              fullWidth
              onClick={formik.handleSubmit}
              sx={{ marginTop: "20px", textTransform: "capitalize" }}
            >
              Create Role
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
