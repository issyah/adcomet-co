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
  Button,
  CircularProgress
} from "@mui/material";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import Head from "next/head";
import { useForm, Controller } from 'react-hook-form';
import { useState } from "react";
import { regexEmail } from "@/src/common";
import { useContextProvider } from "@/context/ContextProvider";
export default function Contact() {
  const [loading, setLoading] = useState(false);
  const {setAlert, alert} = useContextProvider();
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

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    }
  })

  const formFields = [
    {
      md: 6,
      xs: 12,
      Controller: {
        name: 'name',
        rules: {
          required: 'Please fill in your company name'
        }
      },
      Field: {
        label: 'Company name'
      }
    },
    {
      md: 6,
      xs: 12,
      Controller: {
        name: 'email',
        rules: {
          required: 'Please fill in your company email',
          pattern: {
            value: regexEmail(),
            message: 'Please enter a valid email address'
          }
        }
      },
      Field: {
        label: 'Company email'
      }
    },
    {
      md: 6,
      xs: 12,
      Controller: {
        name: 'phone',
        rules: {
          pattern: {
            value: /[0-9]/,
            message: 'Please enter a valid phone number'
          }
        }
      },
      Field: {
        label: 'Phone number'
      }
    },
    {
      md: 6,
      xs: 12,
      Controller: {
        name: 'subject',
        rules: {
          required: 'Please fill in a subject enquiry'
        }
      },
      Field: {
        label: 'Subject'
      }
    },
    {
      md: 12,
      xs: 12,
      Controller: {
        name: 'message',
        rules: {
          required: 'Please fill in the message',
        }
      },
      Field: {
        label: 'Message',
        multiline: true,
        rows: 4,
      }
    }
  ]

  const onSubmit = async (data) => {

    // validated, 
    const { name, email, phone, subject, message } = data;
    // post to api 
    setLoading(true);
    const res = await fetch(`/api/post-contact-form`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setAlert({
      message: json.message,
      open: true,
      status: !res.status ? 'error' : 'success'
    });

    if(res.ok){
      // clear form 
      reset()
      setLoading(false);
    }

  }

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
                <Typography variant="h5">Send Your Enquiry to Us!</Typography>
                <Typography mt={2}>
                  Our representatives will get in touch with you soon!
                </Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={2}>
                    <Grid container spacing={2}>
                      {formFields.map((item, index) => (
                        <Grid item md={item?.md} xs={item?.xs} key={index}>
                          <Controller
                            control={control}
                            {...item?.Controller}
                            render={({ field }) => <TextField {...field} fullWidth {...item?.Field} error={errors[item?.Controller?.name]} helperText={errors[item?.Controller?.name]?.message} />}
                          />
                        </Grid>
                      ))}
                      {/* <Grid item md={6}>
                        <Controller
                          name='name'
                          control={control}
                          rules={{
                            required: 'Please fill in your company name'
                          }}
                          render={({ field }) =>
                            <TextField fullWidth {...field} label={'Company name'} error={errors?.name} helperText={errors?.name?.message} />
                          }
                        />
                      </Grid>
                      <Grid item md={6}>
                        <Controller 
                          name='email'
                          control={control}
                          rules=
                        />
                      </Grid> */}
                      {/* <Grid item md={6}>
                        <TextField fullWidth label={"Email"} required type='email' />
                      </Grid>
                      <Grid item md={6}>
                        <TextField fullWidth label={"Phone"} />
                      </Grid>
                      <Grid item md={6}>
                        <TextField fullWidth label={"Subject"} required />
                      </Grid> */}
                    </Grid>
                    {/* <TextField multiline rows={4} label={'Message'} required /> */}
                    <Button type='submit' variant='contained' size='large' startIcon={loading && <CircularProgress size={16} color='inherit' />}>Submit</Button>
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
