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
import { Controller, useForm } from "react-hook-form";
import { regexEmail } from "./common";
export default function AddNewUserDialog(props) {
  const { open, setOpen, setUsers, users } = props;
  const { user, setAlert, accessToken } = useContextProvider();
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

  const { control, formState: { errors, isDirty }, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      designation: ""
    }
  });

  const handleUpdateFormData = (id, e) => {
    setFormData({
      ...formData,
      [id]: e.target.value,
    });
  };

  const formFields = [
    {
      md: 6,
      xs: 12,
      id: 'firstName',
      Controller: {
        name: 'firstName',
        rules: {
          required: "Please fill in the first name"
        }
      },
      Field: {
        label: "First name"
      }
    },
    {
      md: 6,
      xs: 12,
      id: 'lastName',
      Controller: {
        name: 'lastName',
        rules: {
          required: "Please fill in the last name"
        }
      },
      Field: {
        label: 'Last name'
      }
    },
    {
      md: 6,
      xs: 12,
      id: 'designation',
      Controller: {
        name: 'designation',
        rules: {
          required: "Please fill in the designation field",
        }
      },
      Field: {
        label: "Designation",
      }
    },
    {
      md: 6,
      xs: 12,
      id: 'email',
      Controller: {
        name: 'email',
        rules: {
          required: "Please fill in the email address",
          pattern: {
            value: regexEmail(),
            message: "Please enter a valid email address"
          }
        }
      },
      Field: {
        label: "Email address",
      }
    },
    {
      md: 12,
      xs: 12,
      id: 'password',
      Controller: {
        name: 'password',
        rules: {
          required: "Please fill in the password",
          min: {
            value: 8,
            message: "The password must be at least 8 characters long"
          }
        }
      },
      Field: {
        label: "Password",
        type: 'password',
        helperText: "Passwords should be at least 8 characters long"
      }
    }
  ]

  // const formFields = [
  //   {
  //     label: "Designation",
  //     value: formData?.designation,
  //     onChange: (e) => handleUpdateFormData('designation', e),
  //     required: true,
  //   },
  //   {
  //     label: "Email address",
  //     value: formData?.email,
  //     onChange: (e) => handleUpdateFormData("email", e),
  //     required: true,
  //     type: "email",
  //   },
  //   {
  //     label: "Set password",
  //     value: formData?.password,
  //     onChange: (e) => handleUpdateFormData("password", e),
  //     type: "password",
  //     required: true,
  //   },
  // ];

  const onSubmit = async (data) => {
    const { firstName, lastName, password, email, designation } = data;
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
      body: JSON.stringify(data),
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    });
    const result = await res.json();
    if (!res.ok) {
      setAlert({
        message: result.message,
        status: 'error',
        open: true
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
    reset();
  };




  const handleClose = () => {
    setOpen(false);
    reset();
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
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
          {/* <Grid container sx={{ mt: 2 }} spacing={2}>
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
          </Grid> */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {formFields.map((item, index) => (
              <Grid item md={item?.md} xs={item?.xs} key={index}>
                <Controller
                  control={control}
                  {...item?.Controller}
                  render={({ field }) =>
                    <TextField {...field} {...item?.Field} fullWidth error={errors[item?.id]} helperText={errors[item?.id]?.message} />
                  }
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button fullWidth variant='contained' type="submit" size='large' disabled={!isDirty} startIcon={loading && <CircularProgress color='inherit' size={16} />}>Submit</Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
