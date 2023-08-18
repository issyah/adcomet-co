/**
 * Generate Adspace card for viewing of listing*/

import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";


const AdSpaceCard = ({
  item
}) => {
  return (
    <CardActionArea href={`/ad-space/locations/view/?id=${item.id}`}>
      <Card sx={{
        borderWidth: 1,
        borderColor: 'transparent',
        borderStyle: 'solid',
        transition: '250ms ease-in border',
        ':hover': {
          borderColor: 'primary.main',
        }
      }}>
        <CardContent>
          {!!item.media?.length &&
            <CardMedia
              image={item.media[0].src}
              alt={item.name}
              sx={{
                height: 140,
                borderRadius: 0.5,
              }}
            />
          }
          <Typography variant="h6" sx={{ mt: 1 }}>{item.name}</Typography>
          
        </CardContent>
      </Card>
    </CardActionArea>
  )
};

export default AdSpaceCard;