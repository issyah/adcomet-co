/**
 * The pricing for the adspace listed 
**/
import { Box, Card, CardContent, Typography } from "@mui/material";
const AdSpacePricingCard = ({
  price
}) => {

  const getBasePrice = () => {
    if(price?.length){
      return price[0];
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography>From:</Typography>
      </CardContent>
    </Card>
  )
}


export default AdSpacePricingCard;