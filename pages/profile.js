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
} from "@mui/material";
import AuthLayout from "../src/layout/AuthLayout";
import { useEffect, useState } from "react";
import { useContextProvider } from "../context/ContextProvider";
import {
  getProfile,
  updateData,
  handleConfirmChangeEmail,
  handleSignOut,
} from "../src/firebase-func";
import VerifyCredentials from "../src/VerifyCredentials";
import ChangePasswordDialog from "../src/ChangePasswordDialog";
export default function Profile(props) {
  const { setLoading, user, setAlert } = useContextProvider();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    address: "",
    postal: "",
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

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    if (!form?.firstName || !form?.lastName || !form?.address) {
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
    const { result, error } = await updateData("users", user?.uid, form);
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
    setLoading(false);
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

  const formData = [
    {
      label: "First name",
      id: "firstName",
      type: "text",
      required: true,
    },
    {
      label: "Last name",
      id: "lastName",
      type: "text",
      required: true,
    },
    {
      label: "Address",
      id: "address",
      type: "text",
      required: true,
    },
    {
      label: "Postal Code",
      id: "postal",
      type: "text",
    },
  ];

  useEffect(() => {
    fetchData();
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
    <AuthLayout>
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
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              Profile
            </Typography>
            <Box component={"form"} onSubmit={handleSubmitProfile}>
              <Box>
                <Stack spacing={4}>
                  {formData?.map((item, index) => (
                    <TextField
                      key={index}
                      {...item}
                      value={form[item?.id]}
                      onChange={(e) => updateForm(item?.id, e.target.value)}
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
          <CardContent sx={{ p: 4 }}>
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
                <Button variant="outlined" onClick={() => setOpenChangePassword(true)} >Change password</Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      )}
    </AuthLayout>
  );
}
