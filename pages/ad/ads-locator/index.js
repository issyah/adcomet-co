

import Link from "@/src/Link";
import AuthLayout from "@/src/layout/AuthLayout";
import { Box, Button, Grid, Typography } from "@mui/material"
const AdsLocator = () => {
  return (
    <Box>
      <Typography variant='h3' component="h1" fontWeight={'bold'}>Ads Locator</Typography>
      <Typography>Select your preferred advertisting platform</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item lg={4} xs={12} md={6}>
          <Button
            fullWidth
            variant="outlined"
            color='inherit'
            sx={{
              justifyContent: "start",
              p: 3,
            }}
            component={Link}
            href='/ad/ads-locator/offline'
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
        <Grid item lg={4} xs={12} md={6}>
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
  )
}

export default AdsLocator;
AdsLocator.getLayout = (page) => <AuthLayout>{page}</AuthLayout>