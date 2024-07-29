import * as React from 'react';
import { Checkbox, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal } from 'components/Modal';
import { TextInput } from 'components/TextInput';
import { useCreateRole } from 'api/roles';
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { createRoleValidation } from 'schema/createRoleValidation';

export default function CreateRole({ onAddRole }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(Boolean(location.state?.createRole));
  const { mutate, isPending } = useCreateRole();

  React.useEffect(() => {
    if (location.state?.createRole) {
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

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
      mutate(
        { data: values },
        {
          onError: (err) => {
            console.log({ err });
            enqueueSnackbar("Role creation failed", { variant: "error" });
          },
          onSuccess: (res) => {
            if (res.status !== "error") {
              enqueueSnackbar("Role created successfully", { variant: "success" });

              onAddRole({
                name: values.roleName,
                lastModified: new Date().toLocaleString(),
                avatar: "OP",
              });
              handleClose();
            } else {
              enqueueSnackbar(res.message, { variant: "error" });
            }
          },
        }
      );
    },
  });

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <div>
      <Button onClick={handleOpen} sx={{ height: '48px', marginTop: '30px', textTransform: 'capitalize' }} variant="contained">
        Create custom role
      </Button>

      <Modal open={open} handleClose={handleClose}>
        <Box sx={{ width: '412px', height: '650px', overflow: 'auto' }}>
          <Typography variant='h2' sx={{ textAlign: 'center', fontStyle: 'normal' }}>Create role</Typography>
          <TextInput
            label="What do you want to call this role?"
            placeholder="Customer support"
            id="roleName"
            value={formik.values.roleName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.roleName && formik.touched.roleName && (
            <p style={{ color: "red" }}>{formik.errors.roleName}</p>
          )}

          <Box>
            <Typography variant='h4' sx={{ fontStyle: 'normal', paddingTop: '20px', color: '#BABABA' }}>Permissions</Typography>
            {[
              { name: 'canViewTransaction', label: 'Can view transaction' },
              { name: 'canExportTransaction', label: 'Can export transaction' },
              { name: 'canViewBusinesses', label: 'Can view businesses' },
              { name: 'canGenerateApiKey', label: 'Can generate API key' },
              { name: 'canViewWithdrawalDetails', label: 'Can view withdrawal details' },
              { name: 'canAddNewBusinesses', label: 'Can add new businesses' },
              { name: 'canExportBusinesses', label: 'Can export businesses' },
              { name: 'canInviteNewMember', label: 'Can invite new member' },
              { name: 'canRemoveExistingMember', label: 'Can remove existing member' },
              { name: 'canCreateRole', label: 'Can create role' },
              { name: 'canChangeRole', label: 'Can change role' }
            ].map((permission) => (
              <Box key={permission.name} sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  {...label}
                  name={permission.name}
                  checked={formik.values[permission.name]}
                  onChange={formik.handleChange}
                />
                <Typography variant='h5' sx={{ textAlign: 'start', fontStyle: 'normal' }}>{permission.label}</Typography>
              </Box>
            ))}

            <Button
              sx={{ width: '100%', marginTop: '15px', textTransform: 'capitalize', padding: '10px' }}
              variant="contained"
              onClick={formik.handleSubmit}
              disabled={isPending}
            >
              Create Role
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
