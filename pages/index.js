import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@/src/Link";
import Public from "@/src/layout/Public";
import {
  Alert,
  Button,
  Card,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  CardContent,
} from "@mui/material";
import { useRouter } from "next/router";
import Banner1 from "../public/index-1.jpeg";
import illus1 from "../svg/content.svg";
import illusLocation from "../svg/location.svg";
import illusBudget from "../svg/budget.svg";
import illusUpload from "../svg/upload.svg";
import illusAgreement from "../svg/agreement.svg";
import Banner from "../public/banner.jpg";
import Icon1 from '../public/icons/billboard.png';
import Icon2 from '../public/icons/website.png';
import Icon3 from '../public/icons/tv.png';
import Icon4 from '../public/icons/mobile.png';
import ServiceBg from '../public/services-bg.jpg';
import BannerImg from "../public/IndexBanner.jpg";
import Image from "next/image";
export default function Index() {
  const router = useRouter();
  const [email, setEmail] = React.useState();
  const [company, setCompany] = React.useState();
  const [message, setMessage] = React.useState();
  const [business, setBusiness] = React.useState("business-owner");
  const [alert, setAlert] = React.useState({
    open: false,
    message: "",
  });
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((email, company, message)) {
      // send the email
      const res = await fetch("/api/post-contact", {
        method: "POST",
        body: JSON.stringify({ email, company, message, business }),
      });

      const json = await res.json();
      setAlert({
        open: true,
        message: json.message,
      });

      if (json.status) {
        setLoading(false);
        setCompany("");
        setMessage("");
        setEmail("");
        setBusiness("business-owner");
      }
    }
  };
  const handleAlertClose = () => {
    setAlert({
      open: false,
      message: "",
    });
  };

  const scrollToContent = () => {
    // get #learn-more position
    const elem = document.getElementById("learn-more");
    window.scrollTo(0, elem?.offsetTop);
  };

  const cardContent = [
    {
      title: "Digital signages & billboards ads",
      subtitle: "Targeted and strategically placed",
      icon: Icon1,
    },
    {
      icon: Icon2,
      title: "Website ads campaign",
      subtitle: "Specific ads space banner to choose from",
      sx: {
        background: `url(${ServiceBg.src}) 50% 50%`,
        backgroundSize: 'cover',
        color: 'grey.100'
      }
    },
    {
      icon: Icon3,
      title: "TV/Radio Ads campaign",
      subtitle: "Target affluent audience through linear platform",
    },
    {
      icon: Icon4,
      title: "Mobile ads <br/> campaign",
      subtitle: "Engage interactive audience through app",
    },
  ];

  const howItWorks = [
    {
      title: 'Pick Your Perfect Spot',
      content: "Handpick the perfect location for your ads. Let your advertising strategy flourish in the perfect spots."
    },
    {
      title: 'Set Your Budget And Schedule',
      content: "We provide flexible options tailored for first timers, big-spenders, and everyone in between, ensuring every dollar is maximised."
    },
    {
      title: "Upload Your Final Artwork",
      content: "Create simple, easy to read artwork that stands out and grabs attention. Need help with your design? We have your back."
    },
    {
      title: "Seal The Deal",
      content: "Once approved, your campaign launches instantly, enabling you to witness results without delay."
    }
  ]

  return (
    <Box>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={5000}
        onClose={handleAlertClose}
        open={alert?.open}
      >
        <Alert
          onClose={handleAlertClose}
          severity={"success"}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          height: {
            md: "100vh",
            xs: "auto",
          },
          mt: {
            md: -4,
          },
          pt: {
            xs: 4,
            md: 0,
          },
          background: `url(${Banner.src}) 50% 50% no-repeat`,
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center">
            <Grid item md={6}>
              <Typography
                variant="h2"
                fontWeight="900"
                component={"h1"}
                gutterBottom
                sx={{
                  color: "primary.main",
                }}
              >
                Unleash Endless Advertising Opportunities
              </Typography>
              <Typography variant="h6" fontWeight="normal">
                Power sales, captivate audiences. <Box sx={{ display: { xs: 'inline', md: 'block' } }}></Box> Affordable rates, incredible results.
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Image src={BannerImg} className="img-responsive" />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        my={10}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Box
            mt={4}
            textAlign="center"
            sx={{
              width: {
                md: "80%",
                sm: "auto",
              },
              mx: "auto",
            }}
          >
            <Typography
              variant="h3"
              sx={{ color: "primary.main" }}
              fontWeight="900"
              gutterBottom
            >
              Elevate your Ads with our top-tier marketplace.
            </Typography>
          </Box>
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {cardContent.map((item, index) => (
              <Grid item md={3} sm={6} xs={12} key={index}>
                <Card
                  elevation={2}
                  sx={{
                    bgcolor: "grey.100",
                    boxShadow: "none",
                    height: "100%",
                    ...(item.sx && { ...item.sx })
                  }}
                >
                  <CardContent sx={{ height: "100%" }}>
                    {item.icon &&
                      <Box mb={2}>
                        <Image src={item.icon} height={69} width={69} alt={item.title} />
                      </Box>
                    }
                    <Typography
                      fontWeight="bold"
                      variant="h5"
                      gutterBottom
                      component={"div"}
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    ></Typography>
                    <Typography>{item.subtitle}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          my: 10,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems='center'>
            <Grid item md={6}>
              <Image src={Banner1} className='img-responsive' />
            </Grid>
            <Grid item md={6}>
              <Typography
                variant="h3"
                fontWeight={900}
                gutterBottom
                sx={{
                  color: "primary.main",
                }}
              >
                The World's Advertising Network Company
              </Typography>
              <Typography sx={{ mb: 4 }}>
                We are dedicated to assisting business owners and marketing
                professionals in reaching new audiences and maximizing sales
                through an incredible wide range of advertising platforms.
              </Typography>
              <Typography>
                Adcomet provides an empowering platform that grants businesses
                of any scale the opportunity to effortlessly establish and
                affordably utilize Digital, OOH, Linear, and Non-linear
                advertising platforms.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box bgcolor='primary.color4' overflow='hidden' sx={{
        py: 10
      }}>
        <Container maxWidth='lg'>
          <Grid container spacing={4} alignItems='center'>
            <Grid item md={6} xs={12}>
              <Typography variant='h3' color={'grey.100'} fontWeight='900' gutterBottom>
                Drive Traffic That Converts
              </Typography>
              <Typography color='grey.300'>
                Promote your business and reach the right audience
              </Typography>
            </Grid>
            <Grid item md={6} xs={12} >
              <Image src={'/campaigns.jpg'} width={1018} height={690} style={{
                height: '100%',
                width: '100%'
              }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box py={10}>
        <Container maxWidth='lg'>
          <Box sx={{
            width: {
              md: '50%'
            }
          }}>
            <Typography variant='h3' fontWeight='900'>
              How To Create Ad Campaign
            </Typography>
          </Box>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {howItWorks.map((item, index) => (
              <Grid item md={6} xs={12} key={index}>
                <Card sx={{height:'100%', boxShadow:0, bgcolor:'grey.100'}} elevation={2}>
                  <CardContent>
                    <Box sx={{
                      display: 'flex',
                      gap: 2,
                      alignItems: 'center'
                    }}>
                      <Box sx={{
                        borderRadius: 12,
                        color: 'grey.100',
                        bgcolor: 'primary.main',
                        height: '64px',
                        width: '64px',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        flexShrink:0,
                      }}>
                        <Typography variant='h4'>{index + 1}</Typography>
                      </Box>
                      <Box>
                        <Typography variant='h6' gutterBottom>{item.title}</Typography>
                        <Typography>{item.content}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box bgcolor={"secondary.main"} py={10}>
        <Container
          maxWidth="lg"
          sx={{
            color: "#FFF",
            textAlign: "center",
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
              ".MuiInputBase-input": {
                color: "#FFF",
              },
              width: {
                md: "50%",
                xs: "100%",
              },
              mx: "auto",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <TextField
                  color="default"
                  label="Company name"
                  variant="filled"
                  name="company"
                  fullWidth
                  required
                  type={"text"}
                  onChange={(e) => setCompany(e.target.value)}
                  value={company}
                />
                <TextField
                  color="default"
                  label="Email"
                  fullWidth
                  required
                  variant="filled"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormControl variant="filled">
                  <InputLabel id="select-id">
                    Which sentence best describes your company?
                  </InputLabel>
                  <Select
                    labelId="select-id"
                    variant="filled"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    sx={{
                      textAlign: "left",
                    }}
                  >
                    <MenuItem value="business-owner">
                      I am a business owner looking to maximize my earnings
                      through ads
                    </MenuItem>
                    <MenuItem value="advertiser">
                      I want to advertise my product / my client's product
                    </MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  color="default"
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  variant="filled"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  startIcon={
                    loading && <CircularProgress size={16} color="inherit" />
                  }
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}


Index.getLayout = (page) => <Public>{page}</Public>