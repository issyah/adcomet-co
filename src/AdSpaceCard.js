/**
 * Generate Adspace card for viewing of listing*/

import { BusinessOutlined, Circle, PinDropOutlined } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Grid,
  CardMedia,
  Stack,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { getIndustrylabel } from "./common";
import Link from "./Link";
const AdSpaceCard = ({ item, pathname }) => {
  const splitAddress = () => {
    if (item.address) {
      return item.address.split(",");
    }
  };

  return (
    <Card
      sx={{
        borderWidth: 1,
        borderColor: "transparent",
        borderStyle: "solid",
        transition: "250ms ease-in border",
      }}
    >
      <CardContent>
        {!!item.media?.length && (
          <CardMedia
            image={item.media[0].src}
            alt={item.name}
            sx={{
              height: 140,
              borderRadius: 1,
            }}
          />
        )}
        <Chip
          sx={{ my: 1, textTransform: "capitalize", px: 1 }}
          label={
            <Typography variant="caption">&#9679; {item.status}</Typography>
          }
          size="small"
          color={item.status == "live" ? "error" : "default"}
        />
        <Typography
          fontWeight={"bold"}
          sx={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {item.name}
        </Typography>
        <Typography sx={{ my: 1 }} variant="body2">
          {item.description}
        </Typography>
        <Stack
          spacing={0.5}
          direction={"row"}
          alignItems={"center"}
          sx={{
            ".MuiSvgIcon-root": {
              typography: "body2",
            },
            ".MuiTypography-root": {
              typography: "body2",
            },
          }}
        >
          <PinDropOutlined />
          <Typography>{splitAddress()[0]}</Typography>
        </Stack>
        {/* <Grid container spacing={0.5}>
          <Grid item xs='auto'>
            <BusinessOutlined />
          </Grid>
          <Grid item xs={'auto'}>
            {getIndustrylabel(item.company?.industryType)}
          </Grid>
        </Grid> */}
        <Button
          component={Link}
          href={`/${pathname}/?id=${item.id}`}
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
        >
          View detail
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdSpaceCard;
