/**
 * Determine the location of the ad space using google maps location & Api
 **/
import {
  Man2Outlined,
  PinDrop,
  PinDropOutlined,
  Preview,
  PreviewOutlined,
  Woman2Outlined,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Stack,
  Grid,
  Box,
  Button,
  InputAdornment,
  Autocomplete,
  Chip,
  FormControl,
  InputLabel,
  Slider,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "./MapComponent";
import { useState } from "react";
import { Controller } from "react-hook-form";
import TargetAudience from "@/src/json/target-audience.json";
const AdSpaceLocation = ({
  control,
  handleSubmit,
  errors,
  setTab,
  autoCompleteRef,
  isValid,
}) => {
  const formFields = [
    // {
    //   xs: 12,
    //   md: 12,
    //   id: "address",
    //   type: "autocomplete",
    //   Controller: {
    //     name: "address",
    //   },
    // },
    {
      xs: 12,
      md: 12,
      id: "impressions",
      Controller: {
        name: "impressions",
        rules: {
          required: "Please add in an estimated impressions for the ad space",
          pattern: {
            value: /^[0-9]*$/,
            message: "Please enter a value",
          },
          min: {
            value: 1,
            message: "Please enter a value",
          },
        },
      },
      Field: {
        label: "Estimated impressions",
        type: "number",
        InputProps: {
          startAdornment: (
            <InputAdornment position="start">
              <PreviewOutlined color="primary" />
            </InputAdornment>
          ),
        },
      },
    },
    {
      xs: 12,
      md: 12,
      type: "slider",
      id: "malePercentage",
      Controller: {
        name: "malePercentage",
      },
      Field: {
        label: "Estimated gender ratio impressions",
      },
    },
    // {
    //   xs: 12,
    //   md: 6,
    //   id: "femalePercentage",
    //   Controller: {
    //     name: "femalePercentage",
    //     rules: {
    //       required: "Please set an average % of male impressions",
    //       pattern: {
    //         value: /^[0-9]*$/,
    //         message: "Please enter a number",
    //       },
    //     },
    //   },
    //   Field: {
    //     label: "Estimated Female impression rates",
    //     type: "number",
    //     InputProps: {
    //       endAdornment: <InputAdornment position="end">%</InputAdornment>,
    //     },
    //   },
    // },
    {
      xs: 12,
      md: 12,
      id: "landmarks",
      Controller: {
        name: "landmarks",
      },
      Field: {
        label: "Prominent landmarks (Optional)",
        helperText: "Add in prominent landmarks to increase ad space value",
        multiline: true,
        rows: 3,
        placeholder: "Beside the food court",
      },
    },
    {
      md: 12,
      xs: 12,
      id: "demographics",
      type: "autocomplete",
      Controller: {
        name: "demographics",
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
  ];

  const onSubmit = async (data) => {
    console.log(data);
    console.log(errors);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Location</Typography>
        <Typography>
          Add in the location of your ad space so that advertisers will know
          where it is located.
        </Typography>
        {/* Add location information  */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item md={12}>
              <Controller
                control={control}
                rules={{
                  required: "Please fill in the address",
                }}
                name="address"
                render={({ field }) => (
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PinDropOutlined color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    {...field}
                    label={"Address"}
                    fullWidth
                    inputRef={autoCompleteRef}
                    error={!!errors?.address}
                    helperText={errors?.address?.message || ""}
                  />
                )}
              />
            </Grid>
            {formFields.map((item, index) => (
              <Grid item key={index} md={item.md} xs={item.xs}>
                <Controller
                  control={control}
                  {...item.Controller}
                  render={({ field }) =>
                    item.type == "autocomplete" ? (
                      <Autocomplete
                        {...item.Field}
                        {...field}
                        onChange={(event, values, reason) =>
                          field.onChange(values)
                        }
                        multiple
                        renderInput={(params) => (
                          <TextField
                            multiline
                            fullWidth
                            {...params}
                            label={item.Field?.label}
                            error={!!errors[item.id]}
                            helperText={
                              errors[item.id]?.message ||
                              item?.Field?.helperText
                            }
                          />
                        )}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              size="small"
                              variant="outlined"
                              color="primary"
                              label={option.label}
                              {...getTagProps({ index })}
                              sx={{
                                marginTop: "8px !important",
                                marginBottom: "8px !important",
                              }}
                            />
                          ))
                        }
                      />
                    ) : item.type == "slider" ? (
                      <FormControl fullWidth>
                        <Typography variant="caption">
                          {item.Field.label}
                        </Typography>
                        <Stack spacing={1} direction="row">
                          <Man2Outlined />
                          <Slider
                            {...field}
                            {...item.Field}
                            valueLabelDisplay={"auto"}
                            valueLabelFormat={(value) => (
                              <Box>
                                <Stack spacing={1}>
                                  <Box>Male: {value}%</Box>
                                  <Box>Female: {100 - value}%</Box>
                                </Stack>
                              </Box>
                            )}
                          />
                          <Woman2Outlined />
                        </Stack>
                      </FormControl>
                    ) : (
                      <TextField
                        {...field}
                        {...item.Field}
                        fullWidth
                        error={!!errors[item.id]}
                        helperText={
                          errors[item.id]?.message || item.Field?.helperText
                        }
                      />
                    )
                  }
                />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item md={2} xs={12}>
              <Button onClick={() => setTab("pricing")}>Go back</Button>
            </Grid>
            <Grid item md={10} xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!!Object.keys(errors).length}
              >
                {!!Object.keys(errors).length
                  ? "Please complete all fields"
                  : "View Summary"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdSpaceLocation;
