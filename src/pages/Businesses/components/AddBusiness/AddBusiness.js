import * as React from "react";
import { Typography, Box, Button as MuiButton, styled } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";

import { TextInput } from "../../../../components/TextInput";
import { Modal } from "../../../../components/Modal";
import { addBusinessValidation } from "schema/addBusinessValidation";

const AddButton = styled(MuiButton)({
  marginTop: "35px",
  width: "344px",
  height: "48px",
  backgroundColor: "#3f50b5",
  textAlign: "center",
  "&:hover": {
    backgroundColor: "#2D75B6",
  },
});

export function AddBusiness({ onAddBusiness }) {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      address: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
    },
    validationSchema: addBusinessValidation,

    onSubmit: (values) => {
      const newBusiness = {
        id: Date.now(),
        businessName: values.name,
        businessCategory: values.category,
        businessAddress: values.address,
        contactName: values.contactName,
        businessEmail: values.contactEmail,
        contactPhone: values.contactPhone,
        dateAdded: new Date().toLocaleDateString(),
      };

      // Add new business to the table
      onAddBusiness(newBusiness);
      enqueueSnackbar("Business added successfully", { variant: "success" });
      handleClose();
      formik.resetForm();
    },
  });

  return (
    <div>
      <AddButton onClick={handleOpen} sx={{ width: "169px", height: "48px" }} variant="contained">
        Add new Business
      </AddButton>

      <Modal open={open} handleClose={handleClose}>
        <Box sx={{ width: "412px", height: "655px", overflow: "auto" }}>
          <Typography variant="h2" sx={{ textAlign: "center", fontStyle: "normal" }}>
            Add new business
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextInput
              label="Business name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && (
              <p style={{ color: "red" }}>{formik.errors.name}</p>
            )}

            <TextInput
              label="Business category"
              id="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.category && formik.touched.category && (
              <p style={{ color: "red" }}>{formik.errors.category}</p>
            )}

            <TextInput
              label="Business Address"
              id="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <TextInput
              label="Contact's name"
              id="contactName"
              value={formik.values.contactName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <TextInput
              label="Contact's email"
              type="email"
              id="contactEmail"
              value={formik.values.contactEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.contactEmail && formik.touched.contactEmail && (
              <p style={{ color: "red" }}>{formik.errors.contactEmail}</p>
            )}

            <TextInput
              label="Contact's phone no"
              id="contactPhone"
              value={formik.values.contactPhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <AddButton variant="contained" sx={{ width: "100%" }} type="submit" disabled={formik.isSubmitting}>
              Add business
            </AddButton>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
