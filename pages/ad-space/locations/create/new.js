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
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Link from "@/src/Link";
import { useEffect, useState, useRef } from "react";
import { AdSpaceInformation } from "@/src/AdSpaceInformation";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  ArrowBackIos,
  AspectRatio,
  AttachMoneyOutlined,
  PinDropOutlined,
  PreviewOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import AdSpaceMedia from "@/src/AdSpaceMedia";
import AdSpacePricing from "@/src/AdSpacePricing";
import AdSpaceLocation from "@/src/AdSpaceLocation";
import { Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "@/src/MapComponent";
import { formatNumber, formatNumberCompact } from "@/src/common";
import AdSpaceSummary from "@/src/AdSpaceSummary";
import ImageViewDialog from "@/src/ImageViewDialog";
const Create = () => {
  const router = useRouter();
  const [tab, setTab] = useState("information");
  const [marker, setMarker] = useState(null);
  const [reRenderAutocomplete, setReRenderAutocomplete] = useState(0);
  const [viewImage, setViewImage] = useState();
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, errors },
    watch,
    setValue,
    getValues,
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
      label: "Pricing",
      id: "pricing",
    },
    {
      label: "Map Location",
      id: "location",
    },
    {
      label: "Summary",
      id: "summary",
      disabled: !isValid,
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

  useEffect(() => {
    setValue("femalePercentage", 100 - watch("malePercentage"));
  }, [watch("malePercentage")]);

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
            <Button
              color={item.id == tab ? "primary" : "inherit"}
              key={index}
              fontWeight={item.id == tab ? "bold" : undefined}
              onClick={() => setTab(item.id)}
              disabled={item.disabled}
            >
              {item.label}
            </Button>
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
              display: tab == "location" || tab == "summary" ? "block" : "none",
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
            {tab == "summary" && (
              <AdSpaceSummary
                data={getValues()}
                handleSubmit={handleSubmit}
                files={files}
                setViewImage={setViewImage}
                setTab={setTab}
              />
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            <Card
              sx={{
                position: {
                  md: "sticky",
                },
                top: {
                  md: "80px",
                },
              }}
            >
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
                <Typography sx={{ mb: 1 }}>{renderDescription()}</Typography>
                {watch("address") && (
                  <Box
                    display="flex"
                    gap={1}
                    typography={"caption"}
                    alignItems="center"
                    flexGrow={0}
                    flexShrink={1}
                    sx={{
                      ".MuiSvgIcon-root": {
                        typography: "body1",
                      },
                      ".MuiTypography-root": {
                        typography: "body",
                      },
                    }}
                  >
                    <PinDropOutlined />
                    <Typography
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "block",
                      }}
                    >
                      {watch("address")}
                    </Typography>
                  </Box>
                )}
                <Stack
                  spacing={4}
                  direction="row"
                  flexWrap={"wrap"}
                  sx={{
                    ".MuiSvgIcon-root": {
                      typography: "body1",
                    },
                    ".MuiTypography-root": {
                      typography: "body",
                    },
                  }}
                >
                  {watch("impressions") && (
                    <Box
                      display="flex"
                      gap={1}
                      typography={"caption"}
                      alignItems={"center"}
                    >
                      <VisibilityOutlined />
                      <Typography>
                        {formatNumberCompact(watch("impressions"))} per month
                      </Typography>
                    </Box>
                  )}
                  {watch("width") && (
                    <Box
                      display="flex"
                      gap={1}
                      typography={"caption"}
                      alignItems={"center"}
                    >
                      <AspectRatio />
                      <Typography>
                        {watch("width")} x {watch("height")}
                      </Typography>
                    </Box>
                  )}
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={0.5}>
                  {watch("demographics")?.map((item) => (
                    <Grid key={item.label} xs="auto" item>
                      <Chip
                        variant="outlined"
                        label={item.label}
                        color="primary"
                        size="small"
                      />
                    </Grid>
                  ))}
                </Grid>
                <Divider sx={{ my: 2 }} />
                {watchPrice[0].value && (
                  <Box
                    display={"flex"}
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    gap={1}
                  >
                    From
                    <Typography variant="h5">
                      ${watchPrice[0].value} / {watchPrice[0].unit}{" "}
                      {watchPrice[0].metric}
                    </Typography>
                  </Box>
                )}
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
      <ImageViewDialog
        open={!!viewImage}
        setOpen={setViewImage}
        src={viewImage}
        alt={watch("name")}
      />
    </Box>
  );
};

export default Create;
Create.getLayout = (page) => <AuthOwnerLayout>{page}</AuthOwnerLayout>;
