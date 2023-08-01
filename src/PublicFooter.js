/**
 * The main public footer for adcomet public 
**/
import BG from '../public/FooterBG.jpg';
import { Box, Breadcrumbs, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Logo from '../public/logo.png';
import Link from './Link';
import { EmailOutlined, PhoneOutlined, PinOutlined } from '@mui/icons-material';
import moment from 'moment';
export const PublicFooter = (props) => {
  return (
    <footer>
      <Box sx={{
        background: `url(${BG.src}) 50% 50% no-repeat`,
        backgroundSize: 'cover',
        py: 5,
      }}>
        <Container maxWidth='lg'>
          <Grid container spacing={8}>
            <Grid item md={4} xs={12}>
              <Box mb={2}>
                <Image src={Logo} style={{
                  height: '49px',
                  width: 'auto',
                }} />
              </Box>
              <Typography>
                We are a one-stop advertisting network company that provides a marketplace for every advertiser.
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography variant='h6' color='primary.main'>Useful Links</Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Link color='inherit' underline='none' href='/about'>About</Link>
                {/* <Link color='inherit' underline='none' href='/advertise'>Advertise</Link> */}
                {/* <Link color='inherit' underline='none' href='/advertise'>Plans & Pricing</Link> */}
                <Link color='inherit' underline='none' href='/login'>Login</Link>
              </Stack>
            </Grid>
            <Grid item md={4} sx={12}>
              <Typography variant='h6' color='primary.main'>Contact Info</Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Box display='flex' alignItems='center' gap={1}>
                  <PhoneOutlined />
                  <Typography>+65 6513 2676</Typography>
                </Box>
                <Box display='flex' alignItems='center' gap={1}>
                  <EmailOutlined />
                  <Typography>hello@adcomet.co</Typography>
                </Box>
                <Box display='flex' alignItems='center' gap={1}>
                  <PinOutlined />
                  198 Geylang Road #05-03 Singapore 389263
                </Box>
              </Stack>
            </Grid>
          </Grid>
          <Box mt={3} color='grey.100' p={2} bgcolor='primary.main' display='flex' alignItems='center' justifyContent={'space-between'} flexWrap='wrap'>
            <Box>
              © {moment().format('YYYY')} Adcomet Ptd Ltd. All Rights Reserved.
            </Box>
            <Breadcrumbs
              sx={{
                color:'grey.100'
              }}
              separator={'|'}
            >
              {/* <Link color='inherit' href='/privacy'>Privacy</Link>
              <Link color='inherit' href='/terms'>Terms</Link> */}
            </Breadcrumbs>
          </Box>
        </Container>
      </Box>
    </footer>
  )
}