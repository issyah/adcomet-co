/**
 * Update and manage company profile
 * NOTE: only admin users can edit.*/
import {
  Alert,
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
import {
  getCompany,
  getCompanyById,
  getData,
  updateData,
  uploadCompanyLogo,
} from "../src/firebase-func";
export default function Company(props) {
  const { user, alert, setAlert, loading, setLoading } = useContextProvider();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    companySize: "",
    industryType: "itsv",
    photo: {},
  });

  const company = user?.profile?.company;

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
      required: true,
    },
    {
      label: "Company description",
      id: "description",
      multiline: true,
      rows: 8,
      value: formData?.description,
      onChange: (e) => handleFormData(e, "description"),
      required: true,
    },
    {
      label: "Company size",
      id: "companySize",
      value: formData?.companySize,
      onChange: (e) => handleFormData(e, "companySize"),
      required: true,
    },
    {
      label: "Industry",
      type: "select",
      id: "industryType",
      value: formData?.industryType,
      onChange: (e) => {
        setFormData({ ...formData, industryType: e.target.value });
      },
      options: Object.keys(IndustryJson).map((key) => IndustryJson[key]),
      required: true,
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

  const handleUploadLogo = async (e) => {
    e.preventDefault();
    setLoading(true);
    const file = e.target.files[0];
    const { result, error, downloadUrl } = await uploadCompanyLogo(
      company.id,
      file
    );
    if (error) {
      setAlert({
        open: true,
        status: "error",
        message: error?.message,
      });
      setLoading(false);
      return;
    }
    if (result) {
      setAlert({
        open: true,
        status: "success",
        message: "Company logo successfully updated!",
      });
      setFormData({
        ...formData,
        photo: {
          ...formData?.photo,
          url: downloadUrl,
        },
      });
    }

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, industryType, companySize } = formData;
    if (!name || !description || !industryType || !companySize) {
      setAlert({
        status: "error",
        open: true,
        message: "Please fill out all the fields required.",
      });
      return;
    }
    // success
    setLoading(true);
    const { result, error } = await updateData(
      "companies",
      company?.id,
      formData
    );
    if (error) {
      setLoading(false);
      setAlert({
        open: true,
        status: "error",
        message: error?.message,
      });
      return;
    }
    // success 
    setAlert({
      open:true,
      status: 'success',
      message: 'Company profile successfully updated!'
    })

    setLoading(false);
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
                <Grid item md={6} xs={12}>
                  <Card sx={{ width: "100%" }}>
                    <CardContent>
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "60px",
                        }}
                      >
                        {formData?.photo?.url && (
                          <Image src={formData?.photo?.url} fill unoptimized className='img-responsive'/>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {company?.userType == "admin" && (
                    <Button variant="outlined" component={"label"}>
                      Upload new logo
                      <input
                        type={"file"}
                        id="upload-logo"
                        style={{
                          display: "none",
                        }}
                        onChange={handleUploadLogo}
                      />
                    </Button>
                  )}
                </Grid>
              </Grid>{" "}
              <Stack spacing={4} component={"form"} onSubmit={handleSubmit}>
                {forms.map((item, index) =>
                  item?.type == "select" ? (
                    <FormControl>
                      <InputLabel id={`${item.id}-select`}>
                        {item?.label}
                      </InputLabel>
                      <Select
                        {...item}
                        labelId={`#${item.id}-select`}
                        InputProps={{
                          readOnly: user?.profile?.company?.userType == "user",
                        }}
                      >
                        {item?.options?.map((option, index) => (
                          <MenuItem key={index} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <TextField
                      key={index}
                      {...item}
                      fullWidth
                      InputProps={{
                        readOnly: user?.profile?.company?.userType == "user",
                      }}
                    />
                  )
                )}
                {user?.profile?.company?.userType == "admin" ? (
                  <Button type="submit" variant="contained" size="large">
                    Save
                  </Button>
                ) : (
                  <Alert severity="info">
                    The company information can be updated by the administrator
                    / user who registered <b>{user?.profile?.company?.name}</b>.
                  </Alert>
                )}
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </AuthLayout>
  );
}
