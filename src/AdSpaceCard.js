/**
 * Generate Adspace card for viewing of listing*/

import { AspectRatio, BusinessOutlined, Circle, PinDropOutlined } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Grid,
  CardMedia,
  Stack,
  Typography,
  Button,
  Chip,
  Box,
  CardActionArea,
  Divider,
} from "@mui/material";
import { getIndustrylabel } from "./common";
import Link from "./Link";
const AdSpaceCard = ({
  item,
  pathname,
  showStatus,
  horizontal,
  showPricing,
  showCompany,
}) => {
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
      elevation={horizontal ? 0 : 1}
    >
      <CardContent
        sx={
          horizontal && {
            display: "flex",
            gap: 2,
            alignItems: "center",
          }
        }
      >
        {!!item.media?.length && (
          <CardActionArea
            component={Link}
            href={`/${pathname}/?id=${item.id}`}
            sx={
              horizontal && {
                width: "40%",
              }
            }
          >
            <CardMedia
              image={item.media[0].src}
              alt={item.name}
              sx={{
                height: 140,
                borderRadius: 1,
              }}
            />
          </CardActionArea>
        )}

        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          {showStatus && (
            <Chip
              sx={{ mt: 1, textTransform: "capitalize", px: 1 }}
              label={
                <Typography variant="caption">&#9679; {item.status}</Typography>
              }
              size="small"
              color={item.status == "live" ? "error" : "default"}
            />
          )}
          <Typography
            fontWeight={"bold"}
            sx={{
              mt: 1,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {item.name}
          </Typography>
          <Typography
            sx={{
              my: 1,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
            variant="body2"
          >
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
          <Stack
            spacing={0.5}
            direction="row"
            alignItems="center"
            sx={{
              ".MuiSvgIcon-root": {
                typography: "body2",
              },
              ".MuiTypography-root": {
                typography: "body2",
              },
              mt:0.5
            }}
          >
            <AspectRatio />
            <Typography>{item.width} x {item.height}</Typography>
          </Stack>
          {/* <Grid container spacing={0.5}>
            <Grid item xs="auto">
              <BusinessOutlined />
            </Grid>
            <Grid item xs={"auto"}>
              {getIndustrylabel(item.company?.industryType)}
            </Grid>
          </Grid> */}
          <Box display="flex" gap={2} mt={2} alignItems="center">
            <Button
              component={Link}
              href={`${pathname}/?id=${item.id}`}
              variant="outlined"
              sx={{
                width: horizontal ? "50%" : "100%",
              }}
            >
              View detail
            </Button>
            {showPricing && (
              <Box flexGrow={1}>
                <Typography variant={"caption"}>From:</Typography>
                {!!item.price?.length && (
                  <Box display={"flex"} gap={0.5} alignItems="center">
                    <Typography variant="h6">
                      ${item.price[0]?.value}
                    </Typography>
                    <Typography variant="caption">
                      / {item.price[0]?.unit} {item.price[0]?.metric}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
      {horizontal && (
        <CardContent>
          <Divider />
        </CardContent>
      )}
    </Card>
  );
};

export default AdSpaceCard;
