/**
 * The main profile page for the user */
import {
  Grid,
  TextField,
  Typography,
  Box,
  Stack,
  Card,
  CardContent,
  Tabs,
  Tab,
  CardHeader,
  CardActions,
  Button,
  Avatar,
  FormHelperText,
} from "@mui/material";
import AuthLayout from "@/src/layout/AuthLayout";
import { useEffect, useState } from "react";
import { useContextProvider } from "@/context/ContextProvider";
import {
  getProfile,
  updateData,
  handleConfirmChangeEmail,
  handleSignOut,
  uploadAvatar,
} from "@/src/firebase-func";
import VerifyCredentials from "@/src/VerifyCredentials";
import ChangePasswordDialog from "@/src/ChangePasswordDialog";
import { bytesToMegaBytes } from "@/src/common";
import { Controller, useForm } from "react-hook-form";
export default function ProfileComponent(props) {
  const { setLoading, user, setAlert, setUser } = useContextProvider();

  // update to use react-hook-form instead
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: user?.email || "",
      address: "",
      postal: "",
    },
  });

  const [successCredential, setSuccessCredentials] = useState({
    status: false,
    type: "",
  });

  const [loginEmail, setLoginEmail] = useState("");
  const [tab, setTab] = useState("profile");
  const [openCredentialPrompt, setOpenCredentialPrompt] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const { error, result } = await getProfile(user?.uid);
    if (error) {
      setAlert({
        open: true,
        status: "error",
        message: error?.message,
      });
      setLoading(false);
      return;
    }
    if (result?.exists()) {
      const data = result?.data();
      setForm({
        ...form,
        firstName: data?.firstName,
        lastName: data?.lastName,
        address: data?.address,
        postal: data?.postal,
      });
    } else {
      setAlert({
        open: true,
        status: "error",
        message: "User not found.",
      });
    }
    setLoading(false);
  };

  const updateForm = (id, value) => {
    setForm({
      ...form,
      [id]: value,
    });
  };

  const onSubmit = async (data) => {
    const { firstName, lastName, address } = data;
    if (!firstName || !lastName || !address) {
      // update data
      setAlert({
        open: true,
        status: "error",
        message: "Please fill in the required fields.",
      });
      return;
    }
    setLoading(true);
    // update profile
    const { result, error } = await updateData("users", user?.uid, data);
    if (error) {
      setAlert({
        open: true,
        status: "error",
        message: error?.message,
      });
      setLoading(false);
      return;
    }
    // updated.
    setAlert({
      open: true,
      status: "success",
      message: "User profile has been updated!",
    });
    // update current User profile
    setUser({
      ...user,
      profile: {
        ...user?.profile,
        ...data,
      },
    });
    setLoading(false);
  };

  // upload avatar
  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];
    const size = bytesToMegaBytes(file.size);
    if (size > 1) {
      setAlert({
        open: true,
        message: "File size is too big, please upload a smaller size avatar",
        status: "error",
      });
      return;
    }
    setLoading(true);
    const { result, error, downloadUrl } = await uploadAvatar(user?.uid, file);
    if (error) {
      setAlert({
        open: true,
        message: error.message,
        status: "error",
      });
      setLoading(false);
      return;
    }

    setLoading(false);
    // success !
    setAlert({
      open: true,
      status: "success",
      message: "Avatar uploaded successfully!",
    });
    setUser({
      ...user,
      profile: {
        ...user?.profile,
        avatar: downloadUrl,
      },
    });
  };

  const handleChangeEmail = (e) => {
    e.preventDefault();
    if (!loginEmail) {
      setAlert({
        open: true,
        status: "error",
        message: "Login email cannot be missing",
      });
      setLoginEmail(user?.email);
      return;
    }
    // update the success credentials type
    setSuccessCredentials({
      ...successCredential,
      type: "email-update",
    });
    // need to verify credentials again before changing email.
    setOpenCredentialPrompt(true);
  };

  const confirmChangeEmail = async () => {
    if (!loginEmail) {
      return;
    }
    const { result, error } = await handleConfirmChangeEmail(loginEmail);
    if (error) {
      setAlert({
        open: true,
        status: "error",
        message: error.message,
      });
      return;
    }
    // success
    setAlert({
      open: true,
      status: "success",
      message:
        "Your login email has been successfully updated. Please login again. We will log you out now.",
    });
    setTimeout(() => {
      handleSignOut();
    }, 3000);
  };

  const formFields = [
    {
      id: "firstName",
      Controller: {
        name: "firstName",
        rules: {
          required: "Please fill in your first name.",
        },
      },
      Field: {
        label: "First name",
        required: true,
      },
    },
    {
      id: "lastName",
      Controller: {
        name: "lastName",
        rules: {
          required: "Please fill in your last name.",
        },
      },
      Field: {
        label: "Last name",
        required: true,
      },
    },
    {
      id: "address",
      Controller: {
        name: "address",
        rules: {
          required: "Please fill in your address.",
        },
      },
      Field: {
        label: "Address",
        multline: true,
        rows: 3,
        required: true,
      },
    },
    {
      id: "postal",
      Controller: {
        name: "postal",
      },
      Field: {
        label: "Postal code",
      },
    },
  ];

  const updateFormData = () => {
    if (user?.profile) {
      const profile = user?.profile;
      reset({
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        address: profile?.address,
        postal: profile?.postal,
      });
    }
  };

  useEffect(() => {
    updateFormData();
  }, []);

  useEffect(() => {
    // if the user?.profile is not available,
    updateFormData();
    // fetchData();
    setLoginEmail(user?.email);
  }, [user]);

  useEffect(() => {
    if (successCredential?.status) {
      if (successCredential?.type == "email-update") {
        confirmChangeEmail();
      }
    }
  }, [successCredential]);
  return (
    <Box>
      <VerifyCredentials
        open={openCredentialPrompt}
        setOpen={setOpenCredentialPrompt}
        setSuccessCredentials={setSuccessCredentials}
        successCredential={successCredential}
      />
      <ChangePasswordDialog
        open={openChangePassword}
        setOpen={setOpenChangePassword}
      />
      <Typography variant="h3" fontWeight={900} component={"h1"} gutterBottom>
        Profile
      </Typography>
      <Typography>
        Update your profile information and customize your profile settings
      </Typography>
      <Tabs value={tab} onChange={(e, value) => setTab(value)} sx={{ mt: 1 }}>
        <Tab label={"Profile"} value="profile" />
        <Tab label={"Login settings"} value="login" />
      </Tabs>
      {tab == "profile" && (
        <Card
          sx={{
            mt: 4,
            width: {
              md: "80%",
              sm: "100%",
            },
          }}
        >
          <CardContent
            sx={{
              p: {
                md: 4,
              },
            }}
          >
            <Typography variant="h4" gutterBottom>
              Profile
            </Typography>
            <Box
              sx={{
                mb: 4,
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Avatar
                src={user?.profile?.avatar || undefined}
                size="large"
                sx={{
                  height: 120,
                  width: 120,
                }}
              />
              <Box>
                <Button component={"label"} variant="outlined">
                  Upload avatar
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    style={{ display: "none" }}
                    onChange={handleUploadAvatar}
                  />
                </Button>
                <FormHelperText>Max size: 1mb</FormHelperText>
              </Box>
            </Box>
            <Box
              component={"form"}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <Box>
                <Stack spacing={2}>
                  {/* {formData?.map((item, index) => (
                    <TextField
                      key={index}
                      {...item}
                      value={form[item?.id]}
                      onChange={(e) => updateForm(item?.id, e.target.value)}
                    />
                  ))} */}
                  {formFields.map((item, index) => (
                    <Controller
                      key={index}
                      control={control}
                      {...item.Controller}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          {...field}
                          {...item.Field}
                          error={errors[item?.id]}
                          helperText={errors[item?.id]?.message}
                        />
                      )}
                    />
                  ))}
                </Stack>
              </Box>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 4 }}
                size="large"
                type="submit"
                disabled={!isDirty}
              >
                Update
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
      {tab == "login" && (
        <Card
          sx={{
            mt: 4,
            width: {
              md: "80%",
              sm: "100%",
            },
          }}
        >
          <CardContent
            sx={{
              p: {
                md: 4,
              },
            }}
          >
            <Typography variant="h4" gutterBottom>
              Login settings
            </Typography>
            <Stack spacing={4} sx={{ mt: 2 }}>
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                component={"form"}
                onSubmit={handleChangeEmail}
              >
                <TextField
                  size="small"
                  label="Email"
                  value={loginEmail}
                  type="email"
                  onChange={(e) => setLoginEmail(e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
                <Button variant="outlined" type="submit">
                  Change email
                </Button>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <TextField
                  size="small"
                  label="Password"
                  value={"pppppppp"}
                  type="password"
                  disabled={true}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ flexGrow: 1 }}
                />
                <Button
                  variant="outlined"
                  onClick={() => setOpenChangePassword(true)}
                >
                  Change password
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
