/**
 * When a user isn't verified via email, and/or he couldn't find his verified email link,
 * we can resend it again.*/

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
  Typography,
} from "@mui/material";
import { useContextProvider } from "../context/ContextProvider";

export default function ResendVerificationEmailDialog(props) {
  const { open, setOpen, selectedUser, setSelectedUser } = props;
  const { setAlert, setLoading, loading } = useContextProvider();
  const handleClose = () => {
    setOpen(false);
    setSelectedUser({});
  };
  const handleSubmit = () => {
    console.log(user);
  };
  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <DialogContent>
        <Grid
          container
          justifyContent={"space-between"}
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Grid item md={"auto"}>
            <Typography variant="h5">Resend verification email</Typography>
          </Grid>
          <Grid item md={"auto"}>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
        <Typography>
          A user is required to verify their email to start using the system. Do
          you want to send a verification email to <b>{selectedUser?.email}</b>?
        </Typography>
        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Stack spacing={2} direction="row" flexWrap="wrap" justifyContent={'flex-end'}>
            <Button color="inherit" onClick={handleClose} variant='outlined'>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              startIcon={
                loading && <CircularProgress color="inherit" size={16} />
              }
            >
              Send email
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
