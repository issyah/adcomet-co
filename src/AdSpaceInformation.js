import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Chip,
  Button,
  Autocomplete,
} from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import ButtonLoading from "./ButtonLoading";

export const AdSpaceInformation = ({
  control,
  errors,
  formState,
  handleSubmit,
  setTab,
}) => {
  const { isValid, isDirty } = formState;
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    setTab("media");
  };

  const formFields = [
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
    // {
    //   id: "demographic",
    //   type: "autocomplete",
    //   Controller: {
    //     name: "demographic",
    //     rules: {
    //       required: "Please select at least one demographic",
    //     },
    //   },
    //   Field: {
    //     label: "Target demographics",
    //     options: TargetAudience.map((item) => ({
    //       value: item.id,
    //       label: item.label,
    //     })),
    //     getOptionLabel: (option) => option.label ?? option,
    //   },
    // },
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
    <Card>
      <CardContent>
        <Typography variant="h4">Information</Typography>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2 }}
        >
          <Grid container spacing={2}>
            {formFields?.map((item, index) => (
              <Grid item md={item.md || 12} xs={item.xs || 12} key={index}>
                <Controller
                  control={control}
                  {...item.Controller}
                  render={({ field }) =>
                    item.type == "select" ? (
                      <FormControl fullWidth>
                        <InputLabel>{item.Field.label}</InputLabel>
                        <Select fullWidth {...field} {...item.Field}>
                          {item.options?.map((item, i) => (
                            <MenuItem key={i} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {item.Field?.helperText && (
                          <Typography sx={{ mt: 0.5 }} variant="caption">
                            {item.Field?.helperText}
                          </Typography>
                        )}
                      </FormControl>
                    ) : item.type == "autocomplete" ? (
                      <Autocomplete
                        {...item.Field}
                        {...field}
                        onChange={(event, values, reason) =>
                          field.onChange(values)
                        }
                        multiple
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={item.Field.label}
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
                              variant="outlined"
                              color="primary"
                              label={option.label}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                      />
                    ) : (
                      <TextField
                        fullWidth
                        {...field}
                        {...item.Field}
                        error={!!errors[item.id]}
                        helperText={
                          errors[item.id]?.message || item?.Field?.helperText
                        }
                      />
                    )
                  }
                />
              </Grid>
            ))}
          </Grid>

          <ButtonLoading
            disabled={!isDirty}
            fullWidth
            sx={{ mt: 2 }}
            variant="contained"
            size="large"
            type="submit"
            loading={loading}
          >
            Continue
          </ButtonLoading>
        </Box>
      </CardContent>
    </Card>
  );
};
