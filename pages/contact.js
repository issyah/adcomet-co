// contact us page

import Public from "../src/layout/Public";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  TextField,
  Button
} from "@mui/material";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import Head from "next/head";
export default function Contact() {
  const contactDetails = [
    {
      title: "Phone number",
      icon: <LocalPhoneOutlinedIcon />,
      content: "(+65) 9624 5049",
    },
    {
      title: "Email Address",
      icon: <EmailOutlinedIcon />,
      content: "hello@adcomet.co",
    },
    {
      title: "Address",
      icon: <FmdGoodOutlinedIcon />,
      content: "198 Geylang Road #05-03 Singapore 398263",
    },
  ];
  return (
    <Box py={5}>
      <Head>
        <title>Contact us | Adcomet</title>
      </Head>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component={"h1"}
          color="primary.main"
          textAlign="center"
          fontWeight={900}
        >
          Contact Us
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item md={3} xs={12}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Need additional information?
            </Typography>
            <Typography>
              Contact us to find out more information about us!
            </Typography>
          </Grid>
          {contactDetails.map((item, index) => (
            <Grid item md={3} xs={12} key={index}>
              <Card
                sx={{
                  borderColor: "primary.main",
                  borderTopStyle: "solid",
                  borderWidth: 2,
                  height: "100%",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      height: 49,
                      width: 49,
                      bgcolor: "grey.100",
                      textAlign: "center",
                      pt: "15px",
                      borderRadius: 10,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography mt={1} variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography>{item.content}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Card sx={{ mt: 4 }}>
          <CardContent
            sx={{
              p: {
                md: 4,
              },
            }}
          >
            <Grid container spacing={2} justifyContent='space-between'>
              <Grid item md={3} xs={12}>
                <Typography variant="h4">Send Your Enquiry to Us!</Typography>
                <Typography mt={2}>
                  Our representatives will get in touch with you soon!
                </Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <Box component={"form"}>
                  <Stack spacing={2}>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                        <TextField fullWidth label={"Company name"} />
                      </Grid>
                      <Grid item md={6}>
                        <TextField fullWidth label={"Email"} />
                      </Grid>
                      <Grid item md={6}>
                        <TextField fullWidth label={"Phone"} />
                      </Grid>
                      <Grid item md={6}>
                        <TextField fullWidth label={"Subject"} />
                      </Grid>
                    </Grid>
                    <TextField multiline rows={4} label={'Message'} />
                    <Button variant='contained' size='large'>Submit</Button>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

Contact.getLayout = (page) => <Public>{page}</Public>;
