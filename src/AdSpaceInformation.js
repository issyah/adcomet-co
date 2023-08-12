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
  formFields,
  control,
  errors,
  formState,
  handleSubmit,
  setTab
}) => {
  const { isValid, isDirty } = formState;
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    setTab('media')
  };

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
                          {item.options?.map((item) => (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
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
                              color='primary'
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
