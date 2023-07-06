import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import Public from "../layout/public";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { useRouter } from "next/router";
import Banner1 from "../public/index-1.jpeg";
import illus1 from "../svg/content.svg";
import illusLocation from "../svg/location.svg";
import illusBudget from "../svg/budget.svg";
import illusUpload from "../svg/upload.svg";
import illusAgreement from "../svg/agreement.svg";
import Image from "next/image";
export default function Index() {
  const router = useRouter();
  return (
    <Public>
      <Box mb={4}>
        <Container
          maxWidth="lg"
          sx={{
            textAlign: "center",
            height: {
              md: "100vh",
              xs: "auto",
            },
            mt: {
              xs: 4,
              md: 0,
            },
          }}
        >
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
            height={"100%"}
          >
            <Box>
              <Box
                sx={{
                  height: "150px",
                  position: "relative",
                  mb: 2,
                }}
              >
                <Image src={illus1} fill />
              </Box>
              <Typography
                fontWeight={900}
                textAlign={"center"}
                variant="h2"
                component="h1"
                gutterBottom
              >
                Supercharge Your Sales with Self-Serve Billboard Advertising
              </Typography>
              <Typography
                mx="auto"
                variant="h6"
                textAlign="center"
                fontWeight={"normal"}
                sx={{
                  mb: 4,
                  width: {
                    md: "80%",
                    xs: "100%",
                  },
                }}
              >
                Unleash the Power of Digital Billboards to Capture New Audiences
                and Skyrocket Your Sales. Take control of your marketing
                strategy with ease, backed by affordable rates and awe-inspiring
                results.
              </Typography>
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  router.push("/", { hash: "more-info" });
                }}
              >
                Learn more
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box
        mb={4}
        position="relative"
        sx={{
          height: {
            md: "800px",
            xs: "inherit",
          },
        }}
      >
        <Box
          width={"100%"}
          height={"100%"}
          position="absolute"
          left={0}
          top={0}
          sx={{
            img: {
              objectFit: "cover",
              objectPosition: "center",
            },
            ":after": {
              position: "absolute",
              height: "100%",
              width: "100%",
              content: '""',
              background: "rgba(0,0,0,.1)",
            },
          }}
        >
          <Image src={Banner1} fill />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          height={"100%"}
        >
          <Container maxWidth="md" sx={{ mb: 4, position: "relative" }}>
            <Grid container maxWidth={"md"} sx={{ py: 10 }}>
              <Grid xs={12} md={"12"} sx={{ textAlign: "center" }}>
                <Typography
                  variant="h3"
                  fontWeight={900}
                  color="white"
                  gutterBottom
                >
                  Unlock an array of possibilities with thousands of
                  easy-to-set-up digital billboard
                </Typography>
                <Typography fontWeight="normal" color="white" variant="h6">
                  Tailored to business of every size. Experience unparalleled
                  flexibility and accessibility like never before.
                  {/* Tailored to Businesses of Every Size. Experience
                  unparalleled flexibility and accessibility like never before. */}
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Box py={10}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight={900}
            textAlign={"center"}
            sx={{ mb: 20 }}
          >
            How it works
          </Typography>
          <Grid container spacing={4} sx={{ mb: 10 }} alignItems="center">
            <Grid item md={6} xs={12}>
              <Box height={250} width={"100%"} position="relative">
                <Image src={illusLocation} fill />
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2">Step 1</Typography>
              <Typography variant="h4" gutterBottom>
                Pick your perfect spot
              </Typography>
              <Typography>
                Handpick the perfect locations for your Ads to thrive and shine!
                Take control with single or multiple locations of your choice.
                Let your advertising strategy flourish in the perfect spots.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={4}
            sx={{
              mb: 10,
              flexDirection: {
                md: "row-reverse",
                xs: "row",
              },
            }}
            alignItems="center"
          >
            <Grid item md={6} xs={12}>
              <Box height={250} width={"100%"} position="relative">
                <Image src={illusBudget} fill />
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2">Step 2</Typography>
              <Typography variant="h4" gutterBottom>
                Set your budget and schedule
              </Typography>
              <Typography>
                Harmonise your spend and schedule with your growth objectives.
                We provide flexible options tailored for first-timers,
                big-spenders, and everyone in Between, ensuring every dollar is
                maximised.
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={4} sx={{ mb: 10 }} alignItems="center">
            <Grid item md={6} xs={12}>
              <Box height={250} width={"100%"} position="relative">
                <Image src={illusUpload} fill />
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2">Step 3</Typography>
              <Typography variant="h4" gutterBottom>
                Upload your final artwork
              </Typography>
              <Typography>
                Create simple, easy to read artwork that stands out and grabs
                attention. Need help with your design? We have your back.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={4}
            sx={{
              mb: 10,
              flexDirection: {
                md: "row-reverse",
                xs: "row",
              },
            }}
            alignItems="center"
          >
            <Grid item md={6} xs={12}>
              <Box height={250} width={"100%"} position="relative">
                <Image src={illusAgreement} fill />
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body2">Step 4</Typography>
              <Typography variant="h4" gutterBottom>
                Seal the deal with our approval process
              </Typography>
              <Typography>
                Rest assured as our expert sign partners review and approve your
                designs, ensuring they're ready for action. Once approved, your
                campaign launches instantly, enabling you to witness results
                without delay.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box bgcolor={"secondary.main"} py={10}>
        <Container
          maxWidgh="lg"
          sx={{
            color: "#FFF",
            textAlign:'center'
          }}
        >
          <Typography variant="h3" fontWeight="900">
            Contact us for demo
          </Typography>
          <Box
            mt={10}
            sx={{
              ".MuiFormLabel-root": {
                color: "grey.100",
              },
              width: {
                md: "50%",
                xs: "100%",
              },
              mx:'auto'
            }}
          >
            <form>
              <Stack spacing={4}>
                <TextField
                  color="default"
                  label="Company name"
                  variant="filled"
                  name="company"
                  fullWidth
                  required
                />
                <TextField 
                  color='default'
                  label='Email'
                  fullWidth
                  required
                  variant='filled'
                />
                <TextField 
                  color='default'
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  variant='filled'
                  required
                />
                <Button type='submit' fullWidth size='large' variant='contained'>Submit</Button>
              </Stack>
            </form>
          </Box>
        </Container>
      </Box>
    </Public>
  );
}
