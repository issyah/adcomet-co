/**
 * Select the campaign location*/ 
import { Box, Typography } from "@mui/material"
export default function CampaignLocation(props){
  return (
    <Box>
      <Typography variant='h3' component={'h1'} fontWeight={'900'}>
        Campaign Location
      </Typography>
      <Typography>Select your preferred location</Typography>
    </Box>
  )
}