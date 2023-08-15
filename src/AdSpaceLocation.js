/**
 * Determine the location of the ad space using google maps location & Api
**/
const { Card, CardContent, Typography, TextField, Stack } = require("@mui/material")



const AdSpaceLocation = ({
  formField,

}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h4'>Location</Typography>
        {/* Add location information  */}
        <Stack spacing={2}>
          <TextField
            label={'Address'}
          />
        </Stack>

      </CardContent>
    </Card>
  )
}



export default AdSpaceLocation;