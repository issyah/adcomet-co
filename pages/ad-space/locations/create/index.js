/**
 * The main create page. Select which format/medium they want to create
 **/

import AuthOwnerLayout from "@/src/layout/AuthOwnerLayout";
import { Box, Button, Grid, Typography } from "@mui/material";
import Head from "next/head";
import Link from "@/src/Link";
const Create = () => {
  return (
    <Box>
      <Head>
        <title>Create an ad space | Adcomet</title>
      </Head>
      <Typography variant="h3" fontWeight={900}>
        Create an Ad Space
      </Typography>
      <Typography>Choose a medium format for your ad location</Typography>
      <Grid container spacing={2} sx={{ mt: 4, width: {
        md: '60%'
      } }}>
        <Grid item md={12}>
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            sx={{
              justifyContent: "start",
              p: 3,
            }}
            component={Link}
            href="/ad-space/locations/create/new"
          >
            <Box>
              <Typography variant="h5">Offline</Typography>
              <Typography>
                Analyze your preferred ad locations through the demographic data
                provided for the ad spaces. Choose from a variety of offline
                mediums including digital billboards, signage, television,
                radio, podcasts, and sponsorships.
              </Typography>
            </Box>
          </Button>
        </Grid>
        <Grid item md={12}>
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            sx={{
              height: "100%",
              alignItems: "start",
              justifyContent: "start",
              p: 3,
            }}
            disabled
          >
            <Box textAlign="left">
              <Typography variant="h5">Online (Coming Soon!)</Typography>
              <Typography>
                Analyze your preferred ad locations through the demographic data
                provided for the ad spaces. Choose from a variety of offline
                mediums including digital billboards, signage, television,
                radio, podcasts, and sponsorships.
              </Typography>
            </Box>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Create;
Create.getLayout = (page) => <AuthOwnerLayout>{page}</AuthOwnerLayout>;
