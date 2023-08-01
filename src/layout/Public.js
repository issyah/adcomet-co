// default layout Adcomet
// build by issyah ismail

import { Alert, Box, Snackbar, Toolbar } from "@mui/material";
import Head from "next/head";
import Navbar from "../Navbar";
import { PublicFooter } from "../PublicFooter";
import { useContextProvider } from "@/context/ContextProvider";
export default function Public(props) {
  const { children } = props;
  const { alert, setAlert } = useContextProvider();
  const handleAlertClose = () => {
    setAlert({
      open: false,
      message: "",
      status: ""
    })
  }
  return (
    <Box>
      <Head>
        <title>
          Adcomet | The marketplace for digital advertising on demand | Send
          your ads directly to digital signs anywhere, anytime and BE SEEN!
        </title>
        <meta
          name="description"
          content="Meta Description: Revolutionise the way you connect with your audience, amplify your brand, and achieve unmatched advertising success. Sign up now with Adcomet."
        />
      </Head>
      <Navbar />
      <Toolbar />
      {alert?.open && (
        <Snackbar
          open={alert?.open}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          autoHideDuration={5000}
          onClose={handleAlertClose}
        >
          <Alert
            severity={alert?.status}
            onClose={handleAlertClose}
            sx={{ width: "100%" }}
          >
            {alert?.message}
          </Alert>
        </Snackbar>
      )}
      <Box mt={4}>{children}</Box>
      <PublicFooter />
    </Box>
  );
}
