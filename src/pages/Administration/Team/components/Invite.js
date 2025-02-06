import * as React from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Link,
  MenuItem,
  TextField,
  ButtonBase,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { TextInput } from "components/TextInput";
import { Modal } from "components/Modal";
import { useInviteTeam } from "api/teammates";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { inviteTeamValidation } from "schema/inviteTeamValidation";


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
const AssignToMenuOption = [
 
  {
    value: "business",
    label: "business",
  },
  {
    value: "technology",
    label: "technology",
  },
  {
    value: "Res",
    label: "Human resources",
  },
];

export default function Invite({onInviteTeammate}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      email: "",
      roles: "",
      assignTo: "",
    },
    validationSchema: inviteTeamValidation,

    onSubmit: (values) => {
      const newTeammate = {
        id: Date.now(),
        fullname: values.assignTo,
        email: values.email,
        roles: values.roles,
        status: "Invite sent",
      };
      onInviteTeammate(newTeammate);
      enqueueSnackbar("invite added successfully", { variant: "success" });
      handleClose();
      formik.resetForm();
    },
  });
  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{ width: "169px", height: "48px", marginTop: "40px" }}
        variant="contained"
      >
        Invite Team Mates
      </Button>

      <Modal open={open} handleClose={handleClose}>
        <Box sx={{ width: "412px", height: "417px", overflow:'auto' }}>
          <Typography
            variant="h2"
            sx={{ textAlign: "center", fontStyle: "normal", marginTop: "20px" }}
          >
            Invite Team Mate
          </Typography>

          <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <TextInput label="Email Address" id="email"  placeholder="enter email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
            {formik.errors.email && formik.touched.email && (
              <p style={{ color: "red" }}>{formik.errors.email}</p>
            )}
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h4">Role</Typography>

                <div>
                  <ButtonBase
                    // LinkComponent={Link}
                    // to={"/administration/roles?create-role=true"}
                    onClick={ () => navigate("/administration/roles", {
                      state: {
                        createRole: true,
                      },
                    })}
                    disableRipple
                    variant="h5"
                    sx={{ textDecoration: "underline", color: "#2D75B6" }}
                  >
                    Create a new role
                  </ButtonBase>
                </div>
              </Box>
              <TextField
              placeholder="select role"
                id="role"
                name="roles"
                value={formik.values.roles}
                onChange={formik.handleChange}               
                onBlur={formik.handleBlur} 
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
              {formik.errors.roles && formik.touched.roles && (
                <p style={{ color: "red" }}>{formik.errors.roles}</p>
              )}
            </Box>

            <Box>
              <Typography variant="h4">Assign to</Typography>
              <TextField
                size="small"
                id="assignTo"
                name="assignTo"
                onChange={formik.handleChange}               
                onBlur={formik.handleBlur} 
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
                {AssignToMenuOption.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {formik.errors.assignTo && formik.touched.assignTo && (
                <p style={{ color: "red" }}>{formik.errors.assignTo}</p>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "30px", padding: "10px" }}
              disabled={formik.isSubmitting}
            >
              Send Invite
              {formik.isPending && <CircularProgress size={18} sx={{ marginLeft: "10px" }} />}
            </Button>
          </Box>
          </form>
          
        </Box>
      </Modal>
    </div>
  );
}