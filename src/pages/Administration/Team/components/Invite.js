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

export default function Invite() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const { mutate, isPending } = useInviteTeam();
  const { enqueueSnackbar } = useSnackbar();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  useFormik({
    initialValues: {
      email: "",
      roles: "",
      assignTo: "",
    },
    validationSchema: inviteTeamValidation,

    onSubmit: (values) => {
      mutate(
        { data: { email: values.email, roles: values.roles, assignTo:values.assignTo } },
        {
          onError: (err) => {
            console.log({ err });
          },
          onSuccess: (res) => {
            if (res.status !== "error") {
              sessionStorage.setItem('token', res.data.token);
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

          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <TextInput label="Email Address" id="email"  placeholder="enter email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur} />
            {errors.email && touched.email && (
              <p style={{ color: "red" }}>{errors.email}</p>
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

            <Box>
              <Typography variant="h4">Assign to</Typography>
              <TextField
                size="small"
                id="assignTo"
                name="assignTo"
                onChange={handleChange}               
                onBlur={handleBlur} 
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
              {errors.assignTo && touched.assignTo && (
                <p style={{ color: "red" }}>{errors.assignTo}</p>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "30px", padding: "10px" }}
              onClick={handleSubmit}
              disabled={isPending}
            >
              Send Invite
            
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}