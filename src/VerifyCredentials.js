/**
 * A universal confirm password again */
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
import { handleVerifyCredentials } from "./firebase-func";

export default function VerifyCredentials(props) {
  const { open, setOpen, setSuccessCredentials, successCredential } = props;
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    setError("");
    setLoading(true);
    e.preventDefault();
    if (!email || !password) {
      setError("Please key in your current email and password");
      setLoading(false);
      return;
    }
    // verify correct credentials
    const { result, error: err } = await handleVerifyCredentials(
      email,
      password
    );
    if (err) {
      setError("Error in verifying your credentials. Please try again");
      setLoading(false);
      return;
    }
    // success update the changes to true
    setSuccessCredentials({
      ...successCredential,
      status: true,
    });
    setLoading(false);
    setEmail("");
    setPassword("");
    setOpen(false);

    // hide the dialog
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">Confirm your credentials</Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          Please enter your credentials to complete the process.
        </Typography>
        <Stack
          spacing={2}
          sx={{ mt: 2 }}
          component={"form"}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Current email login"
            size="small"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="password"
            size="small"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={
              loading && <CircularProgress color="inherit" size={16} />
            }
          >
            Verify
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
