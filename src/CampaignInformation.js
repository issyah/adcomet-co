/**
 * Enter campaign information
 **/
import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Button,
  CardHeader,
  Autocomplete,
  FormHelperText,
  Chip,
  Grid,
} from "@mui/material";
import Industry from "./json/industry.json";
import CreateCampaignProgress from "./CreateCampaignProgress";
import { KeyboardArrowRightOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import { Controller } from 'react-hook-form';
export default function CampaignInformation({ control, formFields, handleSubmit, errors, setValue, getValues, watch }) {
  const renderTags = () => {
    const tags = getValues('campaignTags');
    if (tags?.length) {
      return (
        <Grid container spacing={1}>
          {tags?.map((item, index) => (
            <Grid item md={'auto'} xs={'auto'} key={index}>
              <Chip size="small" color='secondary' label={item} onDelete={() => handleRemoveTags(item)} />
            </Grid>
          ))}
        </Grid>
      )
    }
  }
  const handleAddTags = (e, newValue) => {
    const tags = watch('campaignTags');
    if (newValue) {
      setValue('campaignTags', [...tags, newValue]);
    }
  }

  const handleRemoveTags = (item) => {
    const tags = getValues('campaignTags');
    setValue('campaignTags', tags?.filter((i) => i !== item));
  }

  const onSubmit = (data) => {
    console.log(data);
  }


  useEffect(() => {
    return () => {
      console.log("Are you sure?");
    };
  }, []);
  return (
    <Stack spacing={2}>
      <Box>
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h4" component={"h1"} fontWeight={900}>
              Campaign Information
            </Typography>
            <Typography sx={{ mb: 2 }}>Write your campaign details</Typography>
            <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                {formFields &&
                  formFields?.map((item, index) => (
                    <Controller
                      key={index}
                      {...item?.Controller}
                      control={control}
                      render={({ field }) =>
                        item?.type == 'select' ?
                          <FormControl error={errors[item?.id]}>
                            <InputLabel>{item?.Field?.label}</InputLabel>
                            <Select {...field} {...item?.Field}>
                              {item?.options()}
                            </Select>
                            {errors[item?.id]?.message && <FormHelperText>{errors[item?.id]?.message}</FormHelperText>}
                          </FormControl> :
                          <TextField
                            {...field}
                            {...item?.Field}
                            error={errors[item?.id]}
                            helperText={errors[item?.id]?.message}
                            fullWidth
                          />
                      }
                    />
                  ))
                }
                {/* {formField?.map((item, index) =>
                  item.type == "select" ? (
                    <FormControl key={index}>
                      <InputLabel id={`${item?.id}-inputLabel`}>
                        {item.label}
                      </InputLabel>
                      <Select
                        {...item}
                        value={formData[item.id]}
                        onChange={(e) => handleFormData(e, item.id)}
                        labelId={`${item?.id}-inputLabel`}
                        label={item?.label}
                        required
                      >
                        {item.options()}
                      </Select>
                    </FormControl>
                  ) : (
                    <TextField
                      {...item}
                      onChange={(e) => handleFormData(e, item.id)}
                    />
                  )
                )} */}
                {/* autocomplete input with chips */}
                <Autocomplete
                  label={"Campaign tags"}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={"Campaign tags"}
                      variant="outlined"
                    />
                  )}
                  options={[
                    "Banking & Finance",
                    "Beauty & Wellness",
                    "Food & Dining",
                    "Home & Garden",
                    "Lifestyles & Hobbies",
                    "Media & Entertainment",
                    "News & Politics",
                    "Sports",
                    "Technology",
                    "Travel",
                    "Vehicles & Transportation",
                    "Apparels & Accessories",
                    "Business Services",
                    "Computers & Peripherals",
                    "Employment",
                    "Event Tickets",
                    "Financial Services",
                    "Gifts & Occassions",
                    "Political Cause",
                    "Real Estate",
                    "Software",
                    "Education",
                    "Arts & Entertainment",
                    "Video games",
                    "Industrial",
                    "Pets & Animals",
                    "Science",
                    "Shopping",
                  ]}
                  onChange={handleAddTags}
                  defaultValue={getValues('campaignTags')}
                  // renderTags={renderTags()}
                  multiple
                />
                <Button size='large' variant='contained' type='submit'>Next</Button>

              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
}
