/**
 * The main navbar for the adcommet*/
import { AppBar, Container, Toolbar, Box, Typography } from "@mui/material";
import Image from 'next/image';
import Logo from '../public/logo.png';
export default function Navbar() {
  return (
    <AppBar position="fixed" color="default" elevation={1} sx={{
      bgcolor: '#FFF',
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box>
            <Image src={Logo} width={540} height={140} style={{
              height: '56px',
              width:'auto',
            }}/>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
