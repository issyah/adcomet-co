/**
 * Reset password flow: After the user receive the link for a password reset, this is the page to change the password
 **/
import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useContextProvider } from "../context/ContextProvider";
import Image from "next/image";
import Logo from "../public/logo.png";
import { useState } from "react";
export default function ResetPassword(props) {
  const router = useRouter();
  const { alert, setAlert } = useContextProvider();
  const [newPass, setNewPass] = useState("");
  const [retype, setRetype] = useState("");
  const handleClose = () => {
    setAlert({
      open: false,
      status: "",
      message: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // need to have a min character of 8 
    if(newPass.length < 8) { 
      setAlert({
        open: true,
        status: 'error',
        message: 'New password needs to have a minumum 8 character.'
      })
      return;
    }

    // check if retype is the same as new pass 
    if(newPass !== retype) {
      setAlert({
        open: true,
        status: 'error',
        message: "Re-type password does not match with new password"
      })
      return;
    }
  };

  return (
    <Container component={"main"} maxWidth="xs">
      <CssBaseline />
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
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
        <Typography variant="h5" fontWeight="900" component={"h1"} gutterBottom>
          Reset password
        </Typography>
        <Typography>
          Please key in a new password to reset your current password.
        </Typography>
        <Box
          component={"form"}
          sx={{ mt: 1, width: "100%" }}
          onSubmit={handleSubmit}
        >
          <Stack spacing={2}>
            <TextField
              type="password"
              fullWidth
              label={"New password"}
              required
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              helperText="8 characters minimum"
            />
            <TextField
              type={"password"}
              fullWidth
              label={"Re-type new password"}
              required
              value={retype}
              onChange={(e) => setRetype(e.target.value)}
            />
            <Button type="submit" variant="contained" size="large">
              Submit
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
