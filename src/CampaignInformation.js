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
    <Box>
      <Box>
        <Card sx={{ mt: 2, p: { md: 2 } }}>
          <CardContent>
            <Typography variant="h3" component={"h1"} fontWeight={900}>
              Campaign Information
            </Typography>
            <Typography gutterBottom>Write your campaign details</Typography>
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

                {/* <TextField label="Campaign name" required />
                <TextField
                  multiline
                  rows={3}
                  label="Campaign description"
                  required
                />
                <FormControl>
                  <InputLabel id="campaignType">Campaign Type</InputLabel>
                  <Select labelId="campaignType" label="Campaign Type" required>
                    {Object.keys(Industry)?.map((key) => (
                      <MenuItem key={key} value={key}>
                        {Industry[key]?.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
              </Stack>
              {/* <Box mt={2} textAlign="right">
                <Button
                  variant="contained"
                  type="submit"
                  endIcon={<KeyboardArrowRightOutlined />}
                >
                  Continue
                </Button>
              </Box> */}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
