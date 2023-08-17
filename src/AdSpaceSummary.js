import { formatNumber, formatNumberCompact } from "./common";

/**
 * The final summary before posting this to firebase
 **/
import {
  CardContent,
  Card,
  Typography,
  Box,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Chip,
  IconButton,
  CardActions,
  Button,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

const AdSpaceSummary = ({
  data,
  files,
  handleSubmit,
  setViewImage,
  setTab,
}) => {
  const informationData = [
    {
      label: "Name",
      id: "name",
      md: 4,
    },
    {
      label: "Orientation",
      id: "orientation",
      md: 4,
    },
    {
      label: "Dimension (px)",
      render: (item) => (
        <Typography>
          {item.width} x {item.height}
        </Typography>
      ),
      md: 4,
    },
    {
      label: "Description",
      id: "description",
      md: 12,
    },
  ];

  const locationData = [
    {
      label: "Address",
      id: "address",
      md: 4,
    },
    {
      label: "Lat-lng",
      render: (item) => (
        <Typography>
          {item.location.lat} <br />
          {item.location.lng}
        </Typography>
      ),
      md: 4,
    },
    {
      label: "Estimated impression",
      render: (item) => (
        <Typography>{formatNumberCompact(item.impressions)}</Typography>
      ),
      md: 4,
    },
    {
      label: "Target demographics",
      render: (item) => (
        <Stack spacing={1} direction="row" flexWrap={"wrap"} sx={{ mt: 0.5 }}>
          {item.demographics.length &&
            item.demographics.map((item, index) => (
              <Chip
                key={index}
                size="small"
                variant="outlined"
                label={item.label}
                color="primary"
              />
            ))}
        </Stack>
      ),
    },
    {
      label: "Landmarks",
      id: "landmarks",
      md: 4,
    },
    {
      label: "Gender ratio",
      render: (item) => (
        <Box>
          <Typography>Male: {item.malePercentage}%</Typography>
          <Typography>Female: {item.femalePercentage}%</Typography>
        </Box>
      ),
      md: 4,
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Ad Space Summary</Typography>
        <Divider sx={{ my: 2 }} />
        <Box mt={1}>
          <Typography fontWeight="bold">Information</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {informationData.map((item, index) => (
              <Grid item md={item.md} key={index}>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {item.label}
                </Typography>
                {item.render ? (
                  item.render(data)
                ) : (
                  <Typography>{data[item.id]}</Typography>
                )}
              </Grid>
            ))}
          </Grid>
          <Box textAlign="right">
            <IconButton onClick={() => setTab("information")}>
              <Edit />
            </IconButton>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box mt={2}>
          <Typography fontWeight="bold">Media</Typography>
          {files.length && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {files.map((item, index) => (
                <Grid item md={4} key={index}>
                  <Box
                    sx={{
                      img: {
                        width: "100%",
                        height: "160px",
                        objectFit: "cover",
                        borderRadius: 1,
                        boxShadow: 3,
                        cursor: "pointer",
                      },
                    }}
                  >
                    <img
                      onClick={() => setViewImage(item.src)}
                      src={item.src}
                      alt={`${data.name}-${index}`}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
          <Box textAlign="right">
            <IconButton onClick={() => setTab("media")}>
              <Edit />
            </IconButton>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box mt={2}>
          <Typography fontWeight="bold">Price</Typography>
          {data?.price?.length && (
            <Box component={"ol"}>
              {data?.price?.map((item, index) => (
                <Box component={"li"} key={index}>
                  <Typography variant="h6" component={"span"}>
                    ${item.value}
                  </Typography>
                  <Typography>
                    / {item.unit} {item.metric}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
          <Box textAlign="right">
            <IconButton onClick={() => setTab("price")}>
              <Edit />
            </IconButton>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box mt={2}>
          <Typography fontWeight="bold">Location</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {locationData.map((item, index) => (
              <Grid item md={item.md} xs={12}>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {item.label}
                </Typography>
                {item.render ? (
                  item.render(data)
                ) : (
                  <Typography>{data[item.id]}</Typography>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box textAlign="right">
          <IconButton onClick={() => setTab("location")}>
            <Edit />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={1} justifyContent="flex-end">
          <Grid item md={"auto"} xs={6}>
            <Button fullWidth variant="outlined">
              Save as draft
            </Button>
          </Grid>
          <Grid item md={"auto"} xs={6}>
            <Button variant="contained" fullWidth>
              Published live
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AdSpaceSummary;
