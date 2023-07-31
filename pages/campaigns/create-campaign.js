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
  CardMedia,
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
import { useState } from "react";
import { FolderOpenOutlined, KeyboardArrowRight } from "@mui/icons-material";
export default function CreateCampaign(props) {
  const router = useRouter();
  const adsType = [
    {
      title: "Website campaign ads",
      content:
        "Ads on websites are an effective way for businesses to reach their target audience and generate revenue. The purpose of website ads is to promote products, services, or brands to users who visit the site.",
      href: "/campaigns/campaign-creator/?type=website",
      id: "website",
    },
    {
      title: "Billboard campaign ads",
      content:
        "Billboards, with their large size and strategic placement in high-traffic areas, have the power to grab the attention of passersby and create a lasting impression.",
      id: "billboard",
    },
  ];
  const [selected, setSelected] = useState("website");
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
        <Grid item md={4} xs={12}>
          <Stack spacing={2}>
            {adsType.map((item, index) => (
              <Button
                key={index}
                fullWidth
                color="secondary"
                variant={selected == item?.id ? "contained" : "outlined"}
                onClick={() => setSelected(item?.id)}
                sx={{
                  textAlign: "left",
                  p: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {item?.title}
                  </Typography>
                  <Typography>{item?.content}</Typography>
                </Box>
              </Button>
            ))}
          </Stack>
        </Grid>
        <Grid item md={8} xs={12}>
          <Card sx={{ height: "100%" }}>
            {!selected && (
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box>
                  <FolderOpenOutlined sx={{ fontSize: 42 }} />
                </Box>
              </CardContent>
            )}
            {selected && (
              <CardMedia
                image={
                  selected == "website"
                    ? ImageWebsite?.src
                    : ImageBillboard?.src
                }
                fullWidth
                sx={{
                  height: "100%",
                }}
              />
            )}
          </Card>
        </Grid>
      </Grid>
      <Box textAlign={"right"} mt={2}>
        <Button
          size="large"
          variant="contained"
          disable={!selected}
          endIcon={<KeyboardArrowRight />}
          onClick={() => router.push(`/campaigns/campaign-creator/?type=${selected}`)}
        >
          Continue
        </Button>
      </Box>
    </AuthLayout>
  );
}
