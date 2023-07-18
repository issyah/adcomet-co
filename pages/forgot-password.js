/**
 * If a user forgets a password, he can enters his email to get a password reset link
 **/
import {
  Container,
  Typography,
  Link,
  Snackbar,
  Alert,
  Box,
  TextField,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { useContextProvider } from "../context/ContextProvider";
import Image from "next/image";
import Logo from "../public/logo.png";
import { useState } from "react";
import { handleResetPassword } from "../src/firebase-func";
import { useRouter } from "next/router";
import { KeyboardArrowLeftOutlined } from "@mui/icons-material";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Adcomet
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function ForgotPassword(props) {
  const { alert, setAlert } = useContextProvider();
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setAlert({
      open: false,
      status: "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email) {
      const { result, error } = await handleResetPassword(email);
      let message, status;
      if (error) {
        status = "error";
        if (error.code === "auth/user-not-found") {
          message = "Uh oh. The email is not registered. Did you enter the correct email?";
        } else if (error.code === "auth/invalid-email") {
          message = "You have entered an invalid email. Please try again.";
        } else {
          message = "Uh oh. An error has occured. Please try again later.";
        }
      } else {
        // success
        message =
          "An email with the reset password link has been sent to you. Please reset your password within 24 hours.";
        status = "success";
        setEmail("");
      }
      setLoading(false);
      setAlert({
        open: true,
        status: status,
        message: message,
      });
    }
  };

  return (
    <Container component={"main"} maxWidth="xs">
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={5000}
        onClose={handleClose}
        open={alert?.open}
      >
        <Alert severity={alert?.status} onClose={handleClose}>
          {alert?.message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        {" "}
        <Box
          sx={{
            position: "relative",
            height: "56px",
            width: "100%",
            mb: 4,
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        >
          <Image src={Logo} fill className="img-responsive" />
        </Box>
        <Typography component="h1" variant="h5" fontWeight={900} gutterBottom>
          Forgot your password?
        </Typography>
        <Typography>
          Please enter your email address. We will send you an email with the
          password reset instructions.
        </Typography>
        <Box mt={4} width={"100%"} component={"form"} onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              required
              type="email"
              fullWidth
            ></TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              startIcon={loading && <CircularProgress size={16} color="inherit" />}
            >
              Submit
            </Button>
            <Button
              size="large"
              variant="outlined"
              onClick={() => router.back()}
              startIcon={<KeyboardArrowLeftOutlined />}
            >
              Go back
            </Button>
          </Stack>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Box>
    </Container>
  );
}
