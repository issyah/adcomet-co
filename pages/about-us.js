import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Head from "next/head";
import AboutUsImage from "../public/images/about-us-image.jpg";
import Image from "next/image";
import Public from "../src/layout/Public";
export default function AboutUs() {
  const teamMembers = [
    {
      name: "Fadli Sazali",
      designation: "Chief Operating Officer, Founder",
      image: "/images/fad.jpg",
    },
    {
      name: 'Fauzan Johari',
      designation: "Chief Executive Officer",
      image: "/images/zan.jpg"
    },
    {
      name: 'Issyah Ismail',
      designation: "Chief Technology Officer, Founder",
      image:'/images/sya.jpg'
    }
  ];
  return (
    <Box pb={5}>
      <Head>
        <title>About us | Adcomet</title>
      </Head>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component={"h1"}
          textAlign="center"
          fontWeight="900"
          color='primary.main'
        >
          About us
        </Typography>
        <Grid container spacing={8} sx={{ mt: 5 }} alignItems="center">
          <Grid item md={6} xs={12}>
            <Typography
              variant="h3"
              color={"primary.main"}
              fontWeight="bold"
              gutterBottom
            >
              Connecting Advertisers In One Platform
            </Typography>
            <Typography mb={2}>
              We are dedicated to assisting business owners and marketing
              professionals in reaching new audiences and maximising sales
              through the incredible potential of self-serve digital billboards.{" "}
            </Typography>
            <Typography mb={2}>
              Adcomet provides an empowering platform that grants businesses of
              any scale the opportunity to effortlessly establish and affordably
              utilise thousands of digital billboards.
            </Typography>
            <Typography mb={2}>
              If you aspire to distinguish yourself from competitors and drive
              the growth of your business through a versatile marketing
              strategy, then you are prepared to embark on impactful campaigns
              with Adcomet.
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Image src={AboutUsImage} className="img-responsive" />
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography
            variant="h3"
            color="primary.main"
            textAlign="center"
            fontWeight="bold"
          >
            The Adcomet Team
          </Typography>
          <Grid container spacing={2} sx={{ mt: 4, }}>
            {teamMembers.map((item, index) => (
              <Grid item md={4} xs={6} key={index}>
                <Card sx={{height:'100%'}}>
                  <CardMedia
                    image={item?.image}
                    title={item?.name}
                    alt={item?.name}
                    sx={{
                      height: "350px",
                      backgroundPosition:'top',
                    }}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h4"
                      color="primary.main"
                      fontWeight="bold"
                      gutterBottom
                    >
                      {item.name}
                    </Typography>
                    <Typography>{item.designation}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

AboutUs.getLayout = (page) => <Public>{page}</Public>;
