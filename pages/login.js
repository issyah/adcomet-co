import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Logo from "../public/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { signIn } from "../src/firebase-func";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useContextProvider } from "../context/ContextProvider";
import { KeyboardArrowRightOutlined } from "@mui/icons-material";
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
        Adcommet
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { alert, setAlert, user } = useContextProvider();
  const [loading , setLoading] = React.useState(false);
  const handleClose = () => {
    setAlert({
      open: false,
      status: "",
      message: "",
    });
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const { result, error } = await signIn(email, password);
    if (error) {
      const code = error.code;
      let message;
      if (code === "auth/wrong-password") {
        message = "Incorrect email or password. Please try again.";
      } else if (code === "auth/user-not-found") {
        message = "User is not registered.";
      }
      setLoading(false);
      setAlert({
        status: "error",
        message,
        open: true,
      });
      return;
    }
    // success
    router.push("/dashboard");

  };

  React.useEffect(() => {
    // if user already logged in, just redirect to dashboard
    if (user !== null || user) {
      router.push("/dashboard");
    }
  }, []);
  const router = useRouter();
  return (
    <Container component="main" maxWidth="xs">
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
          marginTop: 8,
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
        {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5" fontWeight={900}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
            startIcon={loading && <CircularProgress size={16} color='inherit'/>}
          >
            Sign In
          </Button>
          <Grid container justifyContent={"flex-end"} >
            <Grid item xs={'auto'}>
              <Button
                component={Link}
                href="/forgot-password"
                endIcon={<KeyboardArrowRightOutlined />}
              >
                Forgot password
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
