/**
 * Update and manage company profile
 * NOTE: only admin users can edit.*/
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AuthLayout from "../src/layout/AuthLayout";
import IndustryJson from "../src/json/industry.json";
import Image from "next/image";
import { useContextProvider } from "../context/ContextProvider";
import { useEffect, useState } from "react";
import { getCompany, getCompanyById, getData } from "../src/firebase-func";
export default function Company(props) {
  const { user, alert, setAlert, loading, setLoading } = useContextProvider();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    companySize: "",
    industryType: {
      id: 'deal',
      label: "Daily Deals"
    },
    photo: {},
  });

  const handleFormData = (e, id) => {
    setFormData({
      ...formData,
      [id]: e.target.value,
    });
  };

  const forms = [
    {
      label: "Company name",
      id: "name",
      value: formData?.name,
      onChange: (e) => handleFormData(e, "name"),
    },
    {
      label: "Company description",
      id: "description",
      multiline: true,
      rows: 3,
      value: formData?.description,
      onChange: (e) => handleFormData(e, "description"),
    },
    {
      label: "Company size",
      id: "companySize",
      value: formData?.companySize,
      onChange: (e) => handleFormData(e, "companySize"),
    },
    {
      label: "Industry",
      type: "select",
      id: "industry",
      value: formData?.industryType?.id,
      onChange: (e) => handleFormData(e, "industryType"),
      options: Object.keys(IndustryJson).map((key) => IndustryJson[key]),
    },
  ];
  const fetchCompanyProfile = async () => {
    if (user?.profile) {
      setLoading(true);
      const profile = user?.profile;
      const { id } = profile?.company;
      const { result, error } = await getData("companies", id);
      if (error) {
        setAlert({
          open: true,
          message: error.message,
          severity: "error",
        });
        setLoading(false);
        return;
      }
      // success, update company formData
      if (result?.exists()) {
        setFormData(result?.data());
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  useEffect(() => {
    fetchCompanyProfile();
  }, [user]);

  return (
    <AuthLayout>
      <Typography variant="h3" fontWeight="900">
        Company profile
      </Typography>
      <Typography>
        View and manage your company profile. During the approval process, the
        business owners may review your company profile.
      </Typography>
      <Box
        sx={{
          width: {
            md: "80%",
          },
          mt: 4,
        }}
      >
        <Card>
          <CardContent
            sx={{
              p: {
                md: 4,
              },
            }}
          >
            <Stack spacing={4}>
              <Typography variant="h5">Company logo</Typography>
              <Grid
                container
                spacing={1}
                alignItems="center"
                sx={{
                  mx: 0,
                }}
              >
                <Grid item md={6}>
                  <Card sx={{ width: "100%" }}>
                    <CardContent>
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "120px",
                          img: {
                            objectFit: "contain",
                          },
                        }}
                      >
                        <Image src={"/logo.png"} fill />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  item
                  md={6}
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Button variant="outlined" component={"label"}>
                    Upload new logo
                    <input
                      type={"file"}
                      id="upload-logo"
                      style={{
                        display: "none",
                      }}
                    />
                  </Button>
                </Grid>
              </Grid>{" "}
              {forms.map((item, index) =>
                item?.type == "select" ? (
                  <FormControl>
                    <InputLabel id={`${item.id}-select`}>
                      {item?.label}
                    </InputLabel>
                    <Select {...item} labelId={`#${item.id}-select`}>
                      {item?.options?.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField key={index} {...item} fullWidth />
                )
              )}
              <Button type="submit" variant="contained" size="large">
                Save
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </AuthLayout>
  );
}
