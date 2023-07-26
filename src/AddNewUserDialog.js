/**
 * Create new user from the users page
 * This feature is only available for admin users*/

import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useContextProvider } from "../context/ContextProvider";
import { createNewUser } from "./firebase-func";

export default function AddNewUserDialog(props) {
  const { open, setOpen, setUsers, users } = props;
  const { user, setAlert } = useContextProvider();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    designation: "",
    // address: "",
    // postal: "",
  });

  const handleUpdateFormData = (id, e) => {
    setFormData({
      ...formData,
      [id]: e.target.value,
    });
  };
  const formFields = [
    {
      label: "Designation",
      value: formData?.designation,
      onChange: (e) => handleUpdateFormData('designation', e),
      required: true,
    },
    {
      label: "Email address",
      value: formData?.email,
      onChange: (e) => handleUpdateFormData("email", e),
      required: true,
      type: "email",
    },
    {
      label: "Set password",
      value: formData?.password,
      onChange: (e) => handleUpdateFormData("password", e),
      type: "password",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, password, email, designation } = formData;
    if (!firstName || !lastName || !password || !email || !designation) {
      setAlert({
        open: true,
        status: 'error',
        message: 'Missing required fields. Please key in all the fields'
      })
      return;
    }
    setLoading(true);
    // const { result, error, newUser } = await createNewUser(email, formData);
    const res = await fetch('/api/users/create-user', {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        authorization: `Bearer ${user?.accessToken}`
      }
    });
    const result = await res.json(); 
    if (!res.ok) {
      setAlert({
        message: result.message,
        status: 'error',
        open:true
      });
      setLoading(false);
      return;
    }
    // success
    setAlert({
      open: true,
      message: 'New user added successfully!',
      status: 'success'
    });

    // add new user 
    setUsers([
      ...users,
      result,
    ]);
    setLoading(false);
    setOpen(false);
  };




  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
          mb={2}
        >
          <Typography variant="h5" fontWeight="900">
            Add new user
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <Typography>
          Add a new user on the dashboard to allow them to create and manage
          campaigns.
        </Typography>
        <Box component={"form"} onSubmit={handleSubmit}>
          <Grid container sx={{ mt: 2 }} spacing={2}>
            <Grid item md={6}>
              <TextField
                fullWidth
                label={"First name"}
                value={formData?.firstName}
                onChange={(e) => handleUpdateFormData("firstName", e)}
                required
                sx={{
                  '.input:invalid': {
                    borderColor: 'red',
                  }
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                label={"Last name"}
                value={formData?.lastName}
                onChange={(e) => handleUpdateFormData("lastName", e)}
                required
              />
            </Grid>
          </Grid>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {formFields.map((item, index) => (
              <TextField key={index} {...item} />
            ))}
            <Button variant="contained" size="large" type="submit" startIcon={loading && <CircularProgress color='inherit' size={16} />}>
              Add user
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
