import { Box, Card, CardContent, Grid, Stack, Select, TextField, Typography, FormControl, InputLabel, MenuItem, Button } from "@mui/material";
import { Controller } from "react-hook-form";

export const AdSpaceInformation = ({ formFields, control, errors, handleSubmit }) => {
  const onSubmit = async (data) => {
    console.log(data);
  }
  return (
    <Card>
      <CardContent>
        <Typography variant='h4'>Location Information</Typography>
        <Box component={'form'} onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          {formFields?.map((item, index) => (
            <Controller
              key={index}
              control={control}
              {...item.Controller}
              render={({ field }) =>
                item.type == 'select' ?
                  <FormControl fullWidth margin="normal">
                    <InputLabel>{item.Field.label}</InputLabel>
                    <Select
                      fullWidth
                      {...field}
                      {...item.Field}
                    >
                      {item.options?.map((item) => (
                        <MenuItem value={item.value}>{item.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  : <TextField
                    fullWidth
                    margin="normal"
                    {...field}
                    {...item.Field}
                    error={errors[item.id]}
                    helperText={errors[item.id]?.message || item?.Field?.helperText} />
              }
            />
          ))}
          <Button fullWidth sx={{ mt: 2 }} variant='contained' size='large' type='submit'>Continue</Button>
        </Box>
      </CardContent>
    </Card>
  )
}