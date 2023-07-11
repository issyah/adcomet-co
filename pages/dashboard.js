/**
 * The main private dashboard for advertisers
 **/
import { KeyboardArrowRightOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, Divider, Grid, Typography } from "@mui/material";
import AuthLayout from "../layout/AuthLayout";

export default function Dashboard() {
  return (
    <AuthLayout>
      <Typography variant="h3" fontWeight="900">
        Overview
      </Typography>
      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <Card elevation={1}>
              <CardContent>
                <Typography variant="body1" color={"grey.900"}>
                  Total Campaigns
                </Typography>
                <Typography variant="h2" fontWeight={900}>
                  10
                </Typography>
              </CardContent>
              <Divider/>
              <CardActions>
                <Button endIcon={<KeyboardArrowRightOutlined/>}>See all campaigns</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card elevation={1}>
              <CardContent>
                <Typography variant='body1' color='grey.900'>
                  Total Budget 
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
}
