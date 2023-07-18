/**
 * Change password dialog on profile page */

import { Close } from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useContextProvider } from "../context/ContextProvider";
import {
  handleSignOut,
  handleUpdateNewPassword,
  handleVerifyCredentials,
} from "./firebase-func";

export default function ChangePasswordDialog(props) {
  const { open, setOpen } = props;
  const { alert, setAlert, user } = useContextProvider();
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [reNewPass, setReNewPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorForm, setErrorForm] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!currentPass || !reNewPass || !newPass) {
      setErrorForm("Please fill in all the details");
      setLoading(false);
      return;
    }
    if (newPass.length < 8) {
      setErrorForm("New password must be at least 8 characters long");
      setLoading(false);
      return;
    }
    if (newPass !== reNewPass) {
      setErrorForm("New password and re-typed password is not the same.");
      setLoading(false);
      return;
    }

    const { result, error } = await handleVerifyCredentials(
      user?.email,
      currentPass
    );
    if (error) {
      setLoading(false);
      if (error.code == "auth/wrong-password") {
        setErrorForm("Your current password is incorrect.");
      } else {
        setErrorForm(error.message);
      }
      return;
    }
    handleConfirmChangePassword();
    // success, update the current password and log them out
  };
  const handleConfirmChangePassword = async () => {
    setLoading(true);
    const { result, error } = handleUpdateNewPassword(newPass);
    if (error) {
      setLoading(false);
      setErrorForm(error.message);
      return;
    }
    // success
    // close the current modal
    setOpen(false);
    setCurrentPass("");
    setNewPass("");
    setReNewPass("");
    setAlert({
      open: true,
      status: "success",
      message:
        "Your password has been successfully updated. Please login again. We will log you out now ",
    });
    setTimeout(() => {
      handleSignOut();
    }, 3000);

    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">Change password</Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          Type in your current password and new password
        </Typography>
        <Stack spacing={2} component={"form"} onSubmit={handleSubmit}>
          <TextField
            size="small"
            type="password"
            label="Current password"
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
            required
          />
          <TextField
            size="small"
            type="password"
            label="New password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            helperText={"Minimum 8 characters"}
            required
          />
          <TextField
            size="small"
            type="password"
            label="Retype new password"
            value={reNewPass}
            onChange={(e) => setReNewPass(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            startIcon={
              loading && <CircularProgress color="inherit" size={16} />
            }
          >
            Update password
          </Button>
          {errorForm && <Alert severity="error">{errorForm}</Alert>}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
