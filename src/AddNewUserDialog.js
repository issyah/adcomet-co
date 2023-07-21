/**
 * Create new user from the users page
 * This feature is only available for admin users*/

import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function AddNewUserDialog(props) {
  const { open, setOpen, setUsers } = props;
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    address: "",
    postal: "",
  });

  const handleUpdateFormData = (id, e) => {
    setFormData({
      ...formData,
      [id]: e.target.value,
    });
  };
  const formFields = [
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
    {
      label: "Address",
      value: formData?.address,
      onChange: (e) => handleUpdateFormData("address", e),
      multiline: true,
      rows: 4,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        <Box component={"form"} onSubmit={"handleSubmit"}>
          <Grid container sx={{ mt: 2 }} spacing={2}>
            <Grid item md={6}>
              <TextField
                fullWidth
                label={"First name"}
                value={formData?.firstName}
                onChange={(e) => handleUpdateFormData("firstName", e)}
                required
                sx={{
                  '.input:invalid' : {
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
            <Button variant="contained" size="large" type="submit">
              Add user
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
