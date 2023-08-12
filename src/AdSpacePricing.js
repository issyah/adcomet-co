import { Add } from "@mui/icons-material";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

/**
 * Define the pricing here for the ad spaces*/
const { Card, CardContent, Typography, Box, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, IconButton, Alert, AlertTitle } = require("@mui/material")





const AdSpacePricing = ({
  setTab,
  fields,
  control,
  errors,
  handleSubmit,
  append,
  remove
}) => {

  const onSubmit = async (data) => {
    console.log(data);
  }

  const handleError = (index, name) => {
    if (!errors['price']) return;
    if (errors?.price[index] && errors?.price[index][name]) {
      return errors?.price[index][name]?.message;
    }
  }
  const pricingFields = [{
    md: 4,
    xs: 12,
    id: 'value',
    Controller: {
      name: 'value',
      rules: {
        required: 'Please add in the price',
      }
    },
    Field: {
      label: 'Price'
    }
  },
  {
    md: 3,
    xs: 12,
    id: 'unit',
    Controller: {
      name: 'unit',
      rules: {
        required: 'Please add in the unit'
      }
    },
    Field: {
      label: 'Unit'
    }
  },
  {
    md: 3,
    xs: 12,
    id: 'metric',
    Controller: {
      name: 'metric',
      rules: {
        required: 'Please add in the metric',
      }
    },
    type: 'select',
    Field: {
      label: 'Metric',
      options: ["sec(s)", "minute(s)", "hour(s)", "day(s)"]
    }
  }
  ]
  useEffect(() => {
    console.log(errors);
  }, [errors])
  return (
    <Card>
      <CardContent>
        <Typography variant='h4'>Set the price</Typography>
        <Typography gutterBottom>Add the base price for the ad space. This provides a baseline for advertisers to browse through. The final price will be managed on the review process.</Typography>
        <Alert severity="info" sx={{typography:'body2'}}>
          <AlertTitle>How to add price</AlertTitle>
          If the cost of an ad is $1200 for 30 seconds, Price: 1200, unit: 30, metric: sec(s)
        </Alert>
        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <Grid container spacing={2} key={field.id} alignItems='center' sx={{ mt: 1 }}>
              {pricingFields.map((it, i) => (
                <Grid item md={it.md} xs={it.xs} >
                  <Controller
                    control={control}
                    {...it.Controller}
                    name={`price.${index}.${it.Controller.name}`}
                    render={({ field }) => (
                      it.type == 'select' ?
                        <FormControl
                          fullWidth
                          error={!!handleError(index, it.Controller.name)}
                        >
                          <InputLabel>{it.Field.label}</InputLabel>
                          <Select {...field} {...it.Field}>
                            {it.Field?.options?.map((option) => (
                              <MenuItem value={option} key={option}>{option}</MenuItem>
                            ))}
                          </Select>
                        </FormControl> :
                        <TextField
                          {...field}
                          {...it.Field}
                          error={!!handleError(index, it.Controller.name)}
                        />
                    )}
                  />
                </Grid>
              ))}
              <Grid item md={2} xs={12}>
                {index > 0 && <Button onClick={() => remove(index)}>Delete</Button>}
              </Grid>
            </Grid>
          ))}
          <Box mt={2}>
            <Button variant='outlined' startIcon={<Add />} onClick={() => append({ value: "", unit: "", metric: "" })}>Add pricing variation</Button>
          </Box>
          <Button sx={{ mt: 2 }} type='submit' fullWidth variant='contained'>Continue</Button>
        </Box>
      </CardContent>
    </Card >
  )
}


export default AdSpacePricing;