/**
 * Create new location space */
import AuthOwnerLayout from "@/src/layout/AuthOwnerLayout";
import { Box, Breadcrumbs, Button, Grid, Typography } from "@mui/material";
import Link from "@/src/Link";
import { useState } from "react";
import { AdSpaceInformation } from "@/src/AdSpaceInformation";
import { Controller, useForm } from "react-hook-form";
import { ArrowBackIos } from "@mui/icons-material";
import { useRouter } from "next/router";

const Create = () => {
  const router = useRouter();
  const [tab, setTab] = useState('information');
  const { control, handleSubmit, formState: { isDirty, errors } } = useForm({
    defaultValues: {
      name: "",
      description: "",
      orientation: "landscape",
      width: "",
      height: "",
    }
  })

  const progressTabs = [
    {
      label: 'Information',
      id: 'information',
    },
    {
      label: 'Format',
      id: 'format'
    },
    {
      label: 'Map location',
      id: 'location',
    }
  ]

  const informationFormFields = [
    {
      id: 'name',
      Controller: {
        name: 'name',
        rules: {
          required: "Please fill in the name."
        }
      },
      Field: {
        label: "Name",
        placeholder: "Example: Block 2, level 2 beside Lift lobby A",
      }
    },
    {
      id: 'description',
      Controller: {
        name: 'description',
        rules: {
          required: "Please fill in the description of the location"
        }
      },
      Field: {
        label: "Description",
        multiline: true,
        rows: 4,
      }
    },
    {
      id: "orientation",
      Controller: {
        name: "orientation",
        rules: {
          required: "Please select one orientation"
        }
      },
      type: 'select',
      Field: {
        label: "Orientation",
        helperText: "The orientation of the display"
      },
      options: [
        {
          label: 'Landscape',
          value: 'landscape'
        },
        {
          label: 'Portrait',
          value: 'portrait'
        }
      ]
    }
  ]

  return (
    <Box>
      <Button startIcon={<ArrowBackIos />} variant='outlined' onClick={() => router.push('/ad-space/locations')}>Go back</Button>
      <Typography variant="h3" fontWeight={900}>Create Ad Space</Typography>
      <Typography>Create a new ad space for advertisers to create campaigns</Typography>
      <Box sx={{ mt: 2, p: 2, bgcolor: '#FFF', borderRadius: 1, }}>
        <Breadcrumbs separator=">">
          {progressTabs.map((item, index) => (
            <Typography key={index}>{item.label}</Typography>
          ))}
        </Breadcrumbs>
      </Box>
      <Box mt={2}>
        <Grid spacing={2} container>
          <Grid item md={8} xs={12}>
            {tab == 'information' &&
              <AdSpaceInformation
                formFields={informationFormFields}
                control={control}
                handleSubmit={handleSubmit}
                errors={errors} />
            }
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Create;
Create.getLayout = (page) => <AuthOwnerLayout>{page}</AuthOwnerLayout>