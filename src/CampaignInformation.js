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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Industry from "./json/industry.json";
import CreateCampaignProgress from "./CreateCampaignProgress";
import { KeyboardArrowRightOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import TargetAudience from "@/src/json/target-audience.json";
export default function CampaignInformation({
  control,
  formFields,
  handleSubmit,
  errors,
  setValue,
}) {
  const [tags, setTags] = useState([]);
  const handleAddTags = (e, newValue) => {
    if (newValue) {
      setTags([
        ...tags,
        ...newValue.filter((option) => tags?.indexOf(option) === -1),
      ]);
    }
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  const handleDeleteTag = (ind) => {
    setTags(tags?.filter((i) => i.id !== ind));
  };

  useEffect(() => {
    setValue("tags", tags);
  }, [tags]);
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
                        item?.type == "select" ? (
                          <FormControl
                            error={errors[item?.id]}
                            {...item?.FormControl}
                          >
                            <InputLabel>{item?.Field?.label}</InputLabel>
                            <Select {...field} {...item?.Field}>
                              {item?.options()}
                            </Select>
                            {errors[item?.id]?.message && (
                              <FormHelperText>
                                {errors[item?.id]?.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        ) : item?.type == "checkbox" ? (
                          <FormControlLabel
                            control={<Checkbox {...field} />}
                            {...field}
                            {...item?.Field}
                            checked={field.value}
                          />
                        ) : (
                          <TextField
                            {...field}
                            {...item?.Field}
                            error={errors[item?.id]}
                            helperText={errors[item?.id]?.message}
                            fullWidth
                          />
                        )
                      }
                    />
                  ))}
                {/* autocomplete input with chips */}
                <Autocomplete
                  label={"Campaign tags"}
                  value={tags}
                  onChange={handleAddTags}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={"Campaign tags"}
                      variant="standard"
                      helperText={
                        "Optional: Add campaign tags to allow us to recommend you the perfect spot!"
                      }
                    />
                  )}
                  getOptionLabel={(option) => option.label}
                  options={TargetAudience}
                  getOptionsDisabled={(option) =>
                    tags.findIndex((i) => i.id == option.id)
                  }
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        color="secondary"
                        variant="contained"
                        label={option.label}
                        {...getTagProps(index)}
                        style={{
                          marginBottom: 8,
                          marginTop: 8,
                        }}
                        onDelete={() => handleDeleteTag(option.id)}
                      />
                    ))
                  }
                  multiple
                />
                <Button size="large" variant="contained" type="submit">
                  Next
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
}
