/**
 * Main create campaign page
 **/
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import AuthLayout from "../../src/layout/AuthLayout";
import ImageWebsite from "../../public/campaign-website.jpeg";
import ImageBillboard from "../../public/campaign-billboard.jpeg";
import Image from "next/image";
import CreateCampaignProgress from "../../src/CreateCampaignProgress";
import { useRouter } from "next/router";
import Link from "next/link";
export default function CreateCampaign(props) {
  const router = useRouter();
  const adsType = [
    {
      title: "Website campaign ads",
      content:
        "Ads on websites are an effective way for businesses to reach their target audience and generate revenue. The purpose of website ads is to promote products, services, or brands to users who visit the site.",
    },
    {
      title: "Billboard campaign ads",
      content:
        "Billboards, with their large size and strategic placement in high-traffic areas, have the power to grab the attention of passersby and create a lasting impression.",
    },
  ];
  return (
    <AuthLayout>
      <Box mb={2}>
        <CreateCampaignProgress
          list={[
            {
              type: "text",
              label: "Campaign Medium",
              color: "text.primary",
            },
            {
              type: "text",
              label: "Campaign Information",
            },
            {
              type: "text",
              label: "Select location",
            },
          ]}
        />
      </Box>
      <Typography variant="h3" component="h1" fontWeight="900">
        Create a campaign
      </Typography>
      <Typography>Choose your preferred medium for your campaign.</Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item md={4}>
          <Stack spacing={2}>
            {adsType.map((item, index) => (
              <CardActionArea
                key={index}
                sx={{
                  ".MuiCardActionArea-focusHighlight": {
                    bgcolor: "primary.main",
                  },
                  ".MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight" : {
                    opacity:0.5
                  }
                }}
              >
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      {item?.title}
                    </Typography>
                    <Typography variant="body2">{item.content}</Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            ))}
          </Stack>
        </Grid>
      </Grid>
      {/* <Box sx={{ mt: 4 }}>
        <Grid container spacing={4} justifyContent={"center"}>
          <Grid item xs="12" md="6">
            <Card sx={{ width: "100%", height: "100%" }}>
              <Box position="relative" height={300} width={"100%"}>
                <Image src={ImageWebsite} fill />
              </Box>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h5">
                    Launch your ad campaign on a website{" "}
                  </Typography>
                  <Typography>
                    Ads on websites are an effective way for businesses to reach
                    their target audience and generate revenue. The purpose of
                    website ads is to promote products, services, or brands to
                    users who visit the site.
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ marginTop: "auto" }}
                    component={Link}
                    href={`/campaigns/campaign-creator/?type=online`}
                  >
                    Create campaign
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs="12" md="6">
            <Card sx={{ width: "100%" }}>
              <Box position="relative" height={300} width={"100%"}>
                <Image src={ImageBillboard} fill />
              </Box>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h5" gutterBottom>
                    Launch your ad campaign on a billboard{" "}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                    Billboards, with their large size and strategic placement in
                    high-traffic areas, have the power to grab the attention of
                    passersby and create a lasting impression.
                  </Typography>
                  <Button variant="contained" sx={{ mt: "auto" }}>
                    Create campaign
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box> */}
    </AuthLayout>
  );
}
