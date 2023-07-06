// default layout adcommet
// build by issyah ismail

import { Box, Toolbar } from "@mui/material";
import Head from "next/head";
import Navbar from "../src/Navbar";

export default function Public(props) {
  const { children } = props;

  return (
    <Box>
      <Head>
        <title>Adcommet</title>
        <meta
          name="description"
          content="Join the Ranks of Future Billionaires, Championing Sustainability and Embracing Digital Transformation with Ease. Experience a Contractless Journey into the Future of Business, Empowering You to Make a Lasting Impact."
        />
      </Head>
      <Navbar />
      <Toolbar />
      <Box mt={4}>{children}</Box>
    </Box>
  );
}
