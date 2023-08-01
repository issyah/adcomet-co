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
} from "@mui/material";
import Industry from "./json/industry.json";
import CreateCampaignProgress from "./CreateCampaignProgress";
import { KeyboardArrowRightOutlined } from "@mui/icons-material";
import { useEffect } from "react";
export default function CampaignInformation({ formData, setFormData }) {
  const handleFormData = (e, id) => {
    setFormData({
      ...formData,
      [id]: e.target.value,
    });
  };
  const formField = [
    {
      label: "Campaign name",
      id: "name",
    },
    {
      label: "Campaign link",
      helperText: "The link when the user clicks on your campaign",
      placeholder: "https://www.adcomet.co/example",
    },
    {
      label: "Campaign industry",
      id: "industry",
      type: "select",
      options: () =>
        Object.keys(Industry).map((key) => (
          <MenuItem key={key} value={key}>
            {Industry[key].label}
          </MenuItem>
        )),
    },
  ];

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
            <Box component={"form"}>
              <Stack spacing={2}>
                {formField?.map((item, index) =>
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
                )}
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
                />
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ mt: "auto" }}>
        <Button>Next</Button>
      </Box>
    </Stack>
  );
}
