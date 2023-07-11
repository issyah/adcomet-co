// import * as React from 'react';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import ProTip from '../src/ProTip';
// import Link from '../src/Link';
// import Copyright from '../src/Copyright';

import { Container, Typography, Box } from "@mui/material";
import Public from "../src/layout/Public";
// export default function About() {
//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ my: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Material UI - Next.js example
//         </Typography>
//         <Button variant="contained" component={Link} noLinkStyle href="/">
//           Go to the main page
//         </Button>
//         <ProTip />
//         <Copyright />
//       </Box>
//     </Container>
//   );
// }

export default function AboutUs() {
  return (
    <Public>
      <Container maxWidth="lg">
        <Box
          sx={{
            width: {
              md: "60%",
              xs: "100%",
            },
            height: {
              md: "calc(100vh - 64px)",
              xs: "inherit",
              sm: "inherit",
            },
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={"100%"}
          >
            <div>
              <Typography
                variant="h3"
                component={"h1"}
                fontWeight={900}
                gutterBottom
              >
                About us
              </Typography>
              <Typography sx={{ mb: 4 }}>
                We are dedicated to assisting business owners and marketing
                professionals in reaching new audiences and maximising sales
                through the incredible potential of self-serve digital
                billboards. Adcommet provides an empowering platform that grants
                businesses of any scale the opportunity to effortlessly
                establish and affordably utilise thousands of digital
                billboards.
              </Typography>
              <Typography gutterBottom>
                If you aspire to distinguish yourself from competitors and drive
                the growth of your business through a versatile marketing
                strategy, then you are prepared to embark on impactful campaigns
                with Adcommet.
              </Typography>
            </div>
          </Box>
        </Box>
      </Container>
    </Public>
  );
}
