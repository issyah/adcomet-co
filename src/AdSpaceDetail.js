/**
 * Detail information about the ad space
 **/

import {
  AccountCircleOutlined,
  LabelOutlined,
  PersonOutlineOutlined,
  PinDropOutlined,
  SquareOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItemIcon,
  Stack,
  Typography,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
} from "@mui/material";
import { formatNumber } from "./common";
import { red } from "@mui/material/colors";
import { updateData } from "./firebase-func";
import { useContextProvider } from "@/context/ContextProvider";
import { useEffect, useState } from "react";
const AdSpaceDetail = ({
  data,
  setData,
  setViewImage,
  showCreatedBy,
  showStaticMap,
  children,
  allowEdit
}) => {
  const { setAlert } = useContextProvider();
  const getAddressOnly = () => {
    if (data?.address) {
      const split = data?.address?.split(",");
      return split[0];
    }
  };

  // update location status 
  const handleChangeStatus = async (e) => {
    const value = e.target.value;
    setData({
      ...data,
      status: value
    });
    // update the status on the location document 
    const { result, error } = await updateData('adspaces', data?.id, {
      'status': value
    });
    const successMessage = value == 'draft' ? "Your location status has been updated. Your location won't be listed in advertiser's platform." : "Your location status has been updated. Your location will be listed in advertiser's platform";
    const status = error ? 'error' : 'success';
    const message = error ? error.message : successMessage;
    setAlert({
      open: true,
      message,
      status
    });
  }



  return (
    <Card>
      <CardContent>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Grid item md={"auto"}>
            <Typography variant="h4" component={"h1"}>
              {data.name}
            </Typography>
          </Grid>
          {allowEdit &&
            <Grid item md={"auto"}>
              <Stack spacing={1} direction="row" alignItems="center">
                <Typography>Ad-space Status:</Typography>
                <Select value={data?.status} size="small" onChange={handleChangeStatus}>
                  <MenuItem value={"live"}>Live</MenuItem>
                  <MenuItem value={"draft"}>Draft</MenuItem>
                </Select>
              </Stack>
            </Grid>
          }
        </Grid>
        <Stack
          spacing={1}
          direction="row"
          flexWrap="wrap"
          sx={{
            ".MuiSvgIcon-root, .MuiTypography-root": {
              typography: "body1",
            },
            mt: 1,
          }}
        >
          <Box display={"flex"} gap={0.5} alignItems={"center"}>
            <PinDropOutlined />
            <Typography>{getAddressOnly()}</Typography>
          </Box>
          {showCreatedBy && (
            <Box display={"flex"} gap={0.5} alignItems={"center"}>
              <AccountCircleOutlined />
              <Typography>{data?.createdBy}</Typography>
            </Box>
          )}
        </Stack>
        <Box sx={{ my: 2 }}>
          {/* if there is only 1 image */}
          {!!data?.media?.length && (
            <Grid container spacing={2}>
              {data?.media?.map((item, index) => (
                <Grid item md={12 / data?.media?.length || 12} key={index}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "250px",
                      img: {
                        borderRadius: 1,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => setViewImage(item?.src)}
                  >
                    <img src={item?.src} alt={item?.name} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            <Grid item md={7} xs={12}>
              <Typography gutterBottom variant="h4">
                Location Details
              </Typography>
              <Typography variant="body2">{data?.description}</Typography>
              <Divider sx={{ my: 2 }} />
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonOutlineOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography fontWeight="bold">Gender</Typography>}
                    secondary={`${data?.malePercentage}% Male - ${data?.femalePercentage}% Female`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LabelOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography fontWeight={"bold"}>Audience Tag</Typography>
                    }
                    secondary={
                      <Stack spacing={1} direction={"row"} flexWrap={"wrap"}>
                        {data?.demographics?.map((item, index) => (
                          <Chip
                            size="small"
                            key={index}
                            label={item.label}
                            variant="outlined"
                            color="primary"
                            sx={{ mb: 1 }}
                          />
                        ))}
                      </Stack>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <VisibilityOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography fontWeight="bold">
                        Total Estimated Impressions
                      </Typography>
                    }
                    secondary={`${formatNumber(
                      data?.impressions
                    )} impressions per month`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SquareOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography fontWeight="bold">Dimensions</Typography>
                    }
                    secondary={`${data?.width}px (width) by ${data?.height}px (height)`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PinDropOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography fontWeight={"bold"}>Location</Typography>
                    }
                    secondary={`${data?.address}`}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item md={5} xs={12}>
              {showStaticMap && (
                <Box
                  sx={{
                    height: 400,
                    width: 400,

                    img: {
                      width: "100%",
                      height: "auto",
                      borderRadius: 1,
                      boxShadow: 1,
                    },
                  }}
                >
                  <img
                    src={`/api/static-map?lat=${data.location?.lat}&lng=${data.location?.lng}`}
                  />
                </Box>
              )}
              {children}
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdSpaceDetail;
