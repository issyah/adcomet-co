/**
 * Main campaign page for review*/
import AuthOwnerLayout from "@/src/layout/AuthOwnerLayout";
import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";




const Campaigns = () => {
  return (
    <Box>
      <Grid container spacing={2} alignItems={'center'} justifyContent={'space-between'}>
        <Grid item md="auto">
          <Typography variant='h3' fontWeight={'bold'}>Campaigns</Typography>
          <Typography>Manage campaigns for your adspaces</Typography>
        </Grid>
        <Grid item md="auto">
          <Button variant='contained' startIcon={<Add />}>
            Create campaign
          </Button>

        </Grid>
      </Grid>
    </Box>
  )
}

export default Campaigns;
Campaigns.getLayout = (page) => <AuthOwnerLayout>{page}</AuthOwnerLayout>