/**
 * Create new location space */
import AuthOwnerLayout from "@/src/layout/AuthOwnerLayout";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "@/src/Link";
import { useEffect, useState, useRef } from "react";
import { AdSpaceInformation } from "@/src/AdSpaceInformation";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  ArrowBackIos,
  AttachMoneyOutlined,
  PreviewOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import AdSpaceMedia from "@/src/AdSpaceMedia";
import AdSpacePricing from "@/src/AdSpacePricing";
import AdSpaceLocation from "@/src/AdSpaceLocation";
import { Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "@/src/MapComponent";
import { formatNumber } from "@/src/common";
const Create = () => {
  const router = useRouter();
  const [tab, setTab] = useState("information");
  const [marker, setMarker] = useState(null);
  const [reRenderAutocomplete, setReRenderAutocomplete] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      orientation: "landscape",
      width: "",
      height: "",
      price: [
        {
          value: "",
          metric: "",
          unit: "",
        },
      ],
      address: "",
      location: {},
      demographics: [],
      landmarks: "",
      impressions: "",
      malePercentage: 50,
      femalePercentage: 50,
    },
  });
  const autoCompleteRef = useRef();
  const [files, setFiles] = useState([]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "price",
  });

  const renderDescription = () => {
    const description = watch("description");
    if (description.length) {
      return description.substring(0, 300);
    }
  };

  const progressTabs = [
    {
      label: "Information",
      id: "information",
    },
    {
      label: "Upload Media",
      id: "media",
    },
    {
      label: "Pricing & Creative Format",
      id: "pricing",
    },
    {
      label: "Map Location",
      id: "location",
    },
  ];
  const watchPrice = watch("price");

  const defaultMapProps = {
    center: {
      lat: 1.3562738,
      lng: 103.8156335,
    },
    zoom: 12,
  };

  const handleAutoCompletePlace = (value) => {
    if (value) {
      // return the full address path;
      setValue("address", value?.formatted_address);
      if (value?.geometry) {
        const location = {
          lat: value?.geometry?.location?.lat(),
          lng: value?.geometry?.location?.lng(),
        };
        setValue("location", location);
      }
    }
  };

  useEffect(() => {
    if (tab == "location") {
      setReRenderAutocomplete(reRenderAutocomplete + 1);
    }
  }, [tab]);

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIos />}
        variant="outlined"
        onClick={() => router.push("/ad-space/locations/create")}
      >
        Go back
      </Button>
      <Typography variant="h3" fontWeight={900}>
        Create Ad Space
      </Typography>
      <Typography>
        Create a new ad space for advertisers to create campaigns
      </Typography>
      <Box sx={{ mt: 2, p: 2, bgcolor: "#FFF", borderRadius: 1 }}>
        <Breadcrumbs separator=">">
          {progressTabs.map((item, index) => (
            <Typography
              color={item.id == tab ? "primary.main" : undefined}
              key={index}
              fontWeight={item.id == tab ? "bold" : undefined}
              sx={{ cursor: "pointer" }}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </Typography>
          ))}
        </Breadcrumbs>
      </Box>
      <Box mt={2}>
        <Grid spacing={2} container>
          <Grid
            item
            md={12}
            xs={12}
            sx={{
              display: tab == "location" ? "block" : "none",
            }}
          >
            <Card>
              <Wrapper
                libraries={["places", "marker", "maps", "geometry"]}
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}
              >
                <MapComponent
                  center={defaultMapProps.center}
                  zoom={defaultMapProps.zoom}
                  autoCompleteRef={autoCompleteRef}
                  height={300}
                  marker={marker}
                  reRenderAutocomplete={reRenderAutocomplete}
                  autoCompleteValue={handleAutoCompletePlace}
                />
              </Wrapper>
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            {tab == "information" && (
              <AdSpaceInformation
                control={control}
                handleSubmit={handleSubmit}
                errors={errors}
                formState={{
                  isValid,
                  isDirty,
                }}
                setTab={setTab}
              />
            )}
            {tab == "media" && (
              <AdSpaceMedia
                control={control}
                handleSubmit={handleSubmit}
                files={files}
                setFiles={setFiles}
                setTab={setTab}
              />
            )}
            {tab == "pricing" && (
              <AdSpacePricing
                fields={fields}
                setTab={setTab}
                control={control}
                handleSubmit={handleSubmit}
                errors={errors}
                append={append}
                remove={remove}
              />
            )}
            {tab == "location" && (
              <AdSpaceLocation
                setTab={setTab}
                control={control}
                handleSubmit={handleSubmit}
                errors={errors}
                autoCompleteRef={autoCompleteRef}
                isvalid={isValid}
              />
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            <Card>
              <CardContent>
                <Box height={200} overflow="hidden" borderRadius={1}>
                  {!!files.length ? (
                    <Box
                      sx={{
                        img: {
                          height: "200px",
                          width: "100%",
                          objectFit: "cover",
                        },
                      }}
                    >
                      <img src={files[0]?.src} alt={watch("name")} />
                    </Box>
                  ) : (
                    <img
                      src={"https://placehold.co/600x200"}
                      style={{
                        height: 200,
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    mt: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {watch("name")}
                </Typography>
                <Typography>{renderDescription()}</Typography>

                <Grid container spacing={0.5} sx={{ mt: 1 }}>
                  {watch("demographics")?.map((item) => (
                    <Grid key={item.label} xs="auto" item>
                      <Chip
                        variant="outlined"
                        label={item.label}
                        color="primary"
                      />
                    </Grid>
                  ))}
                </Grid>
                <List
                  sx={{
                    ".MuiListItemIcon-root": {
                      minWidth: "32px",
                    },
                    ".MuiListItem-root": {
                      px: 0,
                      py: 0.5,
                    },
                  }}
                >
                  {watchPrice[0].value && (
                    <ListItem>
                      <ListItemIcon>
                        <AttachMoneyOutlined color="primary" />
                      </ListItemIcon>
                      <ListItemText>
                        From ${watchPrice[0].value} for {watchPrice[0].unit}{" "}
                        {watchPrice[0].metric}
                      </ListItemText>
                    </ListItem>
                  )}
                  {watch("impressions") && (
                    <ListItem>
                      <ListItemIcon>
                        <PreviewOutlined color="primary" />
                      </ListItemIcon>
                      <ListItemText>
                        {formatNumber(watch("impressions"))} monthly views
                      </ListItemText>
                    </ListItem>
                  )}
                  
                </List>
                {/* {watchPrice[0]?.value && (
                  <Typography variant={'body1'}>
                    From: ${watchPrice[0].value} for {watchPrice[0].unit}{" "}
                    {watchPrice[0].metric}
                  </Typography>
                )} */}
              </CardContent>
            </Card>
            <Box textAlign="center">
              <Typography variant="caption">
                Ad space listing preview
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Create;
Create.getLayout = (page) => <AuthOwnerLayout>{page}</AuthOwnerLayout>;
