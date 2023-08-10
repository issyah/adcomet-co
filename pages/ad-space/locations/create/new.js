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
  Typography,
} from "@mui/material";
import Link from "@/src/Link";
import { useState } from "react";
import { AdSpaceInformation } from "@/src/AdSpaceInformation";
import { Controller, useForm } from "react-hook-form";
import { ArrowBackIos } from "@mui/icons-material";
import { useRouter } from "next/router";
import TargetAudience from "@/src/json/target-audience.json";
const Create = () => {
  const router = useRouter();
  const [tab, setTab] = useState("information");
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      orientation: "landscape",
      demographic: [],
      width: "",
      height: "",
    },
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
      label: "Creative Format & Pricing",
      id: "pricing",
    },
    {
      label: "Map Location",
      id: "location",
    },
  ];

  const informationFormFields = [
    {
      id: "name",
      Controller: {
        name: "name",
        rules: {
          required: "Please fill in the name.",
        },
      },
      Field: {
        label: "Name",
        placeholder: "Example: Block 2, level 2 beside Lift lobby A",
      },
    },
    {
      id: "description",
      Controller: {
        name: "description",
        rules: {
          required: "Please fill in the description of the location",
        },
      },
      Field: {
        label: "Description",
        multiline: true,
        rows: 4,
      },
    },
    {
      id: "demographic",
      type: "autocomplete",
      Controller: {
        name: "demographic",
        rules: {
          required: "Please select at least one demographic",
        },
      },
      Field: {
        label: "Target demographics",
        options: TargetAudience.map((item) => ({
          value: item.id,
          label: item.label,
        })),
        getOptionLabel: (option) => option.label ?? option,
      },
    },
    {
      md: 4,
      xs: 12,
      id: "orientation",
      Controller: {
        name: "orientation",
        rules: {
          required: "Please select one orientation",
        },
      },
      type: "select",
      Field: {
        label: "Orientation",
      },
      options: [
        {
          label: "Landscape",
          value: "landscape",
        },
        {
          label: "Portrait",
          value: "portrait",
        },
      ],
    },
    {
      md: 4,
      xs: 12,
      id: "width",
      Controller: {
        name: "width",
        rules: {
          required: "Please fill in the width in px",
          min: {
            value: 2,
            message: "The value of the width must be more than 1",
          },
        },
      },
      Field: {
        label: "Width (px)",
      },
    },
    {
      md: 4,
      xs: 12,
      id: "height",
      Controller: {
        name: "height",
        rules: {
          required: "Please fill in the height in px",
          min: {
            value: 2,
            message: "The value of the height must be more than 1",
          },
        },
      },
      Field: {
        label: "Height (px)",
      },
    },
  ];

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
            >
              {item.label}
            </Typography>
          ))}
        </Breadcrumbs>
      </Box>
      <Box mt={2}>
        <Grid spacing={3} container>
          <Grid item md={6} xs={12}>
            {tab == "information" && (
              <AdSpaceInformation
                formFields={informationFormFields}
                control={control}
                handleSubmit={handleSubmit}
                errors={errors}
                formState={{
                  isValid,
                  isDirty,
                }}
              />
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="caption">Ad space listing preview:</Typography>
            <Card>
              <CardContent>
                <Box height={200}>
                  <img
                    src={"https://placehold.co/600x200"}
                    className="img-responsive"
                  />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {watch("name")}
                </Typography>
                <Typography>{renderDescription()}</Typography>
                <Grid container spacing={0.5} sx={{ mt: 1 }}>
                  {watch("demographic")?.map((item) => (
                    <Grid key={item.label} xs="auto" item>
                      <Chip
                        variant="outlined"
                        label={item.label}
                        color="primary"
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Create;
Create.getLayout = (page) => <AuthOwnerLayout>{page}</AuthOwnerLayout>;
