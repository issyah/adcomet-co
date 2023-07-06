import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import Public from "../layout/public";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
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
              md:0,
            }
          }}
        >
          <Box display={"flex"} alignItems="center" justifyContent={"center"} height={'100%'}>
            <Box>
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
                variant='h6'
                textAlign="center"
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
      <Container maxWidth="xl" sx={{mb:4}}>
        <Grid container maxWidth={"xl"} sx={{py:10}}>
          <Grid xs={12} md={"6"}>
            <Typography variant='h6' fontWeight='normal'>
              Unlock an Array of Possibilities with Thousands of Easy-to-Set-Up
              Digital Billboards, Tailored to Businesses of Every Size.
              Experience unparalleled flexibility and accessibility like never
              before.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Public>
  );
}
