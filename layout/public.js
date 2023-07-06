// default layout adcommet
// build by issyah ismail

import { Box, Toolbar } from "@mui/material";
import Navbar from "../src/Navbar";

export default function Public(props) {
  const { children } = props;

  return (
    <Box>
      <Navbar />
      <Toolbar/>
      <Box>{children}</Box>
    </Box>
  );
}
