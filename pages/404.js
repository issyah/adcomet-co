import Link from "@/src/Link";
import { Box, Button, Card, CardContent, Typography, } from "@mui/material";

const page404 = () => {
  return (
    <Box sx={{
      height: {
        md: '100vh'
      },
      width: {
        md: '100vw'
      },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Box

        sx={{
          width: {
            md: '40%'
          }
        }}
      >
        <Card>
          <CardContent>
            <Typography variant='h3' fontWeight={'bold'}>Uh oh! 404</Typography>
            <Typography>We can't find the document or page you are looking for.</Typography>
            <Button 
              sx={{ mt: 1 }} 
              size='large' 
              variant="contained" 
              component={Link}
              href={'/'}>Go back</Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default page404;