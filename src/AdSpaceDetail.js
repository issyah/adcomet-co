/**
 * Detail information about the ad space 
**/

import { AccountCircleOutlined, LabelOutlined, PersonOutlineOutlined, PinDropOutlined, SquareOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, Chip, Divider, Grid, List, ListItemIcon, Stack, Typography, ListItem, ListItemText } from "@mui/material";
import { formatNumber } from "./common";

const AdSpaceDetail = ({
  data,
  setViewImage,
  showCreatedBy,
  showStaticMap,
  children
}) => {
  const getAddressOnly = () => {
    if (data?.address) {
      const split = data?.address?.split(",");
      return split[0]
    }
  }
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} alignItems='center' justifyContent={'space-between'}>
          <Grid item md={'auto'}>
            <Typography variant="h4" component={'h1'}>
              {data.name}
            </Typography>
          </Grid>
          <Grid item md={'auto'}>
            <Chip
              label={data?.status}
              sx={{
                px: 2,
                textTransform: 'capitalize'
              }}
              color={data?.status == 'live' ? 'error' : 'default'}
            />
          </Grid>
        </Grid>
        <Stack spacing={1} direction='row' flexWrap='wrap' sx={{
          '.MuiSvgIcon-root, .MuiTypography-root': {
            typography: 'body1'
          },
          mt: 1
        }}>
          <Box display={'flex'} gap={.5} alignItems={'center'}>
            <PinDropOutlined />
            <Typography>{getAddressOnly()}</Typography>
          </Box>
          {showCreatedBy &&
            <Box display={'flex'} gap={.5} alignItems={'center'}>
              <AccountCircleOutlined />
              <Typography>{data?.createdBy}</Typography>
            </Box>
          }
        </Stack>
        <Box sx={{ my: 2 }}>
          {/* if there is only 1 image */}
          {!!data?.media?.length &&
            <Grid container spacing={0.5}>
              {data?.media?.map((item, index) => (
                <Grid item md={data?.media?.length == 1 ? 12 : 4} key={index}>
                  <Box sx={{
                    width: '100%',
                    height: '250px',
                    'img': {
                      borderRadius: 1,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      cursor: 'pointer',
                    }
                  }}
                    onClick={() => setViewImage(item?.src)}
                  >
                    <img src={item?.src} alt={item?.name} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          }
        </Box>
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            <Grid item md={7} xs={12}>
              <Typography gutterBottom variant='h4'>Location Details</Typography>
              <Typography variant='body2'>{data?.description}</Typography>
              <Divider sx={{ my: 2 }} />
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonOutlineOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography fontWeight='bold'>Gender</Typography>
                    }
                    secondary={
                      `${data?.malePercentage}% Male - ${data?.femalePercentage}% Female`
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LabelOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography fontWeight={'bold'}>Audience Tag</Typography>
                    }
                    secondary={
                      <Stack spacing={.5} direction={'row'} flexWrap={'wrap'} sx={{ mt: 1 }}>
                        {data?.demographics?.map((item, index) => (
                          <Chip
                            size='small'
                            key={index}
                            label={item.label}
                            variant='outlined'
                            color='primary'
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
                    primary={<Typography fontWeight='bold'>Total Estimated Impressions</Typography>}
                    secondary={`${formatNumber(data?.impressions)} impressions per month`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SquareOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography fontWeight='bold'>Dimensions</Typography>}
                    secondary={`${data?.width}px (width) by ${data?.height}px (height)`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PinDropOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography fontWeight={'bold'}>Location</Typography>}
                    secondary={`${data?.address}`}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item md={5} xs={12}>
              {showStaticMap &&
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
              }
              {children}
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}

export default AdSpaceDetail;