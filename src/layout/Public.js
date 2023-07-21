// default layout Adcomet
// build by issyah ismail

import { Box, Toolbar } from "@mui/material";
import Head from "next/head";
import Navbar from "../Navbar";

export default function Public(props) {
  const { children } = props;

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
      <Box mt={4}>{children}</Box>
    </Box>
  );
}
