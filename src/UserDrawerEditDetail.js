/**
 * This is drawer update form*/

import { Close } from "@mui/icons-material";
import {
  Drawer,
  Typography,
  Box,
  Stack,
  TextField,
  Chip,
  Alert,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useContextProvider } from "../context/ContextProvider";
import { updateData } from "./firebase-func";

export default function UserDrawerEditDetail(props) {
  const { open, setOpen, selectedUser, setUpdateUser } = props;
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContextProvider();
  const [errorMessage, setErrorMessage] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    postal: "",
  });

  const handleUpdateFormData = (id, value) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  useEffect(() => {
    if (selectedUser?.uid) {
      setFormData({
        firstName: selectedUser?.firstName,
        lastName: selectedUser?.lastName,
        address: selectedUser?.address,
        postal: selectedUser?.postal,
        designation: selectedUser?.designation,
      });
    }
  }, [selectedUser]);

  const formField = [
    {
      label: "First name",
      value: formData?.firstName,
      onChange: (e) => handleUpdateFormData("firstName", e.target.value),
      required: true,
    },
    {
      label: "Last name",
      value: formData?.lastName,
      onChange: (e) => handleUpdateFormData("lastName", e.target.value),
      required: true,
    },
    {
      label: 'Designation',
      value: formData?.designation,
      required: true,
      onChange: (e) => handleUpdateFormData('designation', e.target.value),
    },
    {
      label: "Address",
      value: formData?.address,
      multiline: true,
      rows: 3,
      onChange: (e) => handleUpdateFormData("address", e.target.value),
    },
    {
      label: "Postal code",
      value: formData?.postal,
      onChange: (e) => handleUpdateFormData("postal", e.target.value),
    },
  ];

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { firstName, lastName, address } = formData;
    if (!firstName || !lastName || !address) {
      setErrorMessage("Please fill in all the required fields");
      setLoading(false);
      return;
    }
    // update the doc
    const { result, error } = await updateData("users", selectedUser?.uid, {
      ...formData,
    });
    if (error) {
      setAlert({
        open: true,
        message: error.message,
        status: "error",
      });
      setLoading(false);
      return;
    }
    // success! update the doc programmatically without re-fetching the data
    setAlert({
      open: true,
      message: `User ${selectedUser?.email} has been successfully updated!`,
      status: "success",
    });
    setLoading(false);
    // close drawer
    handleClose();
    setUpdateUser({
      ...formData,
      uid: selectedUser?.uid,
    });
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor={"right"}
      sx={{
        minWidth: {
          ".MuiPaper-root.MuiDrawer-paper": {
            width: "45%",
          },
        },
      }}
    >
      <Box p={4} width="100%">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" gutterBottom>
            Update user details
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <Typography variant="h6" fontWeight="900">
          {selectedUser.email}
        </Typography>
        {/* <Box sx={{mt:2}}>
          <Chip label={selectedUser?.email} color="primary" />
        </Box> */}
        <Alert severity="info" sx={{ mt: 2 }}>
          Email address cannot be updated due to security issues. To update an
          email, please delete the user and create a new one.
        </Alert>
        <Stack
          spacing={4}
          sx={{ mt: 4 }}
          component="form"
          onSubmit={handleSubmit}
        >
          {formField.map((item, index) => (
            <TextField {...item} key={index} />
          ))}
          <Button
            variant="contained"
            type="submit"
            size="large"
            startIcon={
              loading && <CircularProgress color="inherit" size={16} />
            }
          >
            Update
          </Button>
          {errorMessage && <Alert severify="error">{errorMessage}</Alert>}
        </Stack>
      </Box>
    </Drawer>
  );
}
