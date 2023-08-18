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
  CircularProgress,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useContextProvider } from "@/context/ContextProvider";
import { useState } from "react";
import { createAdSpaceLocation, UploadMediaForAdSpace } from "./firebase-func";
import { useRouter } from "next/router";

const AdSpaceSummary = ({
  data,
  files,
  handleSubmit,
  setViewImage,
  setTab,
  readOnly,
}) => {
  const { company, setAlert, user } = useContextProvider();
  const { email } = user;
  const [loading, setLoading] = useState({
    draft: false,
    live: false,
  });
  const router = useRouter();
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

  // handle the final upload. Add the companyId on the final upload
  const onSubmit = async (type) => {
    setLoading({
      ...loading,
      [type]: true,
    });
    // try to upload the doc first
    const { result, error } = await createAdSpaceLocation({
      ...data,
      companyId: company.id,
      status: type,
      createdBy: email,
    });

    if (error) {
      setAlert({
        open: true,
        status: "error",
        message: error.message,
      });
      setLoading({
        ...loading,
        [type]: false,
      });
      return;
    }
    // success, get the id and save the images
    UploadMediaForAdSpace(result.id, data?.name, files);
    setAlert({
      status: "success",
      message:
        type == "draft"
          ? "Your Ad Space has been saved!"
          : "Your Ad Space has been pushed live!",
      open: true,
    });
    setLoading({
      ...loading,
      [type]: false,
    });
    // redirect to the page view id
    router.push(`/ad-space/locations/view?id=${result.id}`);
  };

  return (
    <Card>
      <CardContent>
        {!readOnly && (
          <>
            <Typography variant="h4">Ad Space Summary</Typography>
            <Divider sx={{ my: 2 }} />
          </>
        )}
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
          {!readOnly && (
            <Box textAlign="right">
              <IconButton onClick={() => setTab("information")}>
                <Edit />
              </IconButton>
            </Box>
          )}
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
          {!readOnly && (
            <Box textAlign="right">
              <IconButton onClick={() => setTab("media")}>
                <Edit />
              </IconButton>
            </Box>
          )}
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
          {!readOnly && (
            <Box textAlign="right">
              <IconButton onClick={() => setTab("price")}>
                <Edit />
              </IconButton>
            </Box>
          )}
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
        {!readOnly && (
          <Box textAlign="right">
            <IconButton onClick={() => setTab("location")}>
              <Edit />
            </IconButton>
          </Box>
        )}
        {!readOnly && (
          <>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={1} justifyContent="flex-end">
              <Grid item md={"auto"} xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={
                    loading.draft && (
                      <CircularProgress color="inherit" size={16} />
                    )
                  }
                  onClick={() => onSubmit("draft")}
                >
                  Save as draft
                </Button>
              </Grid>
              <Grid item md={"auto"} xs={6}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => onSubmit("live")}
                  startIcon={
                    loading.live && (
                      <CircularProgress color="inherit" size={16} />
                    )
                  }
                >
                  Published live
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AdSpaceSummary;
