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
export default function CampaignInformation(props) {

  useEffect(() => {
    return () => {
      console.log('Are you sure?');
    }
  },[])
  return (
    <Box>
      <Typography variant="h3" component={"h1"} fontWeight={900}>
        Campaign Information
      </Typography>
      <Typography>Write your campaign details</Typography>
      <Box
        sx={{
          mt: 2,
          width: {
            md: "80%",
            xs: "100%",
          },
        }}
      >
        <Card sx={{ mt: 2 }}>
          <CardHeader></CardHeader>
          <CardContent>
            <Box component={"form"}>
              <Stack spacing={2}>
                <TextField label="Campaign name" required/>
                <TextField multiline rows={3} label="Campaign description" required/>
                <FormControl>
                  <InputLabel id="campaignType">Campaign Type</InputLabel>
                  <Select labelId="campaignType" label="Campaign Type" required>
                    {Object.keys(Industry)?.map((key) => (
                      <MenuItem key={key} value={key}>
                        {Industry[key]?.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <Box mt={2} textAlign="right">
                <Button
                  variant="contained"
                  type="submit"
                  endIcon={<KeyboardArrowRightOutlined />}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
