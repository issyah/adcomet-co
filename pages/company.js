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
import { Controller, useForm } from "react-hook-form";
import { bytesToMegaBytes } from "@/src/common";
export default function Company(props) {
  const { company, user, alert, setAlert, loading, setLoading } =
    useContextProvider();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    companySize: "",
    industryType: "itsv",
    photo: {},
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      companySize: "",
      industryType: "",
      photo: {},
    },
  });

  const handleFormData = (e, id) => {
    setFormData({
      ...formData,
      [id]: e.target.value,
    });
  };

  const formFields = [
    {
      id: "name",
      Controller: {
        name: "name",
        rules: {
          required: "Please fill in your company name.",
        },
      },
      Field: {
        label: "Company name",
        required: true,
      },
    },
    {
      id: "description",
      Controller: {
        name: "description",
        rules: {
          required: "Please fill in a basic description about your company",
        },
      },
      Field: {
        label: "Company description",
        multiline: true,
        rows: 4,
      },
    },
    {
      id: "companySize",
      type: "select",
      Controller: {
        name: "companySize",
        rules: {
          required: "Please select your company size",
        },
      },
      Field: {
        label: "Company size",
        options: [
          {
            label: "1-2",
            value: "1-2",
          },
          {
            label: "3-5",
            value: "3-5",
          },
          {
            label: "6-10",
            value: "6-10",
          },
          {
            label: "11-20",
            value: "11-20",
          },
          {
            label: "21-50",
            value: "21-50",
          },
          {
            label: "51-100",
            value: "51-100",
          },
          {
            label: "more than 100",
            value: "more than 100",
          },
        ],
      },
    },
  ];

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
        reset(result?.data());
        setFormData(result?.data());
      }
      setLoading(false);
    }
  };

  const handleUploadLogo = async (e) => {
    e.preventDefault();
    setLoading(true);
    const file = e.target.files[0];
    if (!file) return;

    const acceptFileFormat = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
    ];
    const type = file?.type;
    const size = bytesToMegaBytes(file?.size);

    // check if file size is more than 1mb
    if (size > 1) {
      setAlert({
        open: true,
        message: "File size is too big, please upload a smaller size logo",
        status: "error",
      });
      setLoading(false);
      return;
    }

    if (!acceptFileFormat.includes(type)) {
      setAlert({
        open: true,
        message: `File format ${type} is not supported`,
        status: "error",
      });
      setLoading(false);
      return;
    }

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
      // get the current photo object values first
      const photoObj = getValues("photo");
      setValue("photo", {
        ...photoObj,
        url: downloadUrl,
      });
    }

    setLoading(false);
  };
  const getLogo = () => {
    const photo = getValues("photo");
    if (photo?.url) {
      return photo?.url;
    }
    return undefined;
  };
  const onSubmit = async (data) => {
    // e.preventDefault();
    const { name, description, industryType, companySize } = data;
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
    const { result, error } = await updateData("companies", company?.id, data);
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
      open: true,
      status: "success",
      message: "Company profile successfully updated!",
    });
    reset(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  useEffect(() => {
    fetchCompanyProfile();
  }, [company]);

  return (
    <Box>
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
              <Box>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  sx={{
                    mx: 0,
                  }}
                >
                  <Grid item flexGrow={0} xs={"auto"}>
                    <Card
                      sx={{
                        ".MuiCardContent-root:last-child": { pb: 0 },
                      }}
                    >
                      <CardContent
                        sx={{
                          pb: 0,
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            // width: "100%",
                            height: "60px",
                            width: "60px",
                          }}
                        >
                          {getLogo() && (
                            <img
                              src={getLogo()}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {company?.userType == "admin" && (
                      <>
                        <Button
                          variant="outlined"
                          component={"label"}
                          sx={{ mb: 1 }}
                        >
                          Upload new logo
                          <input
                            type={"file"}
                            id="upload-logo"
                            accept={".jpg,.jpeg,.png, .webp"}
                            style={{
                              display: "none",
                            }}
                            onChange={handleUploadLogo}
                          />
                        </Button>
                        <Typography
                          variant="caption"
                          display="flex"
                          flexWrap={"wrap"}
                          flexGrow={0}
                        >
                          Recommended size : 1MB (60x60)
                        </Typography>
                      </>
                    )}
                  </Grid>
                </Grid>{" "}
              </Box>
              <Stack
                spacing={4}
                component={"form"}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                {formFields.map((item, index) => (
                  <Controller
                    key={index}
                    control={control}
                    {...item?.Controller}
                    render={({ field }) =>
                      item?.type != "select" ? (
                        <TextField
                          {...field}
                          {...item?.Field}
                          error={errors[item?.id]}
                          helperText={errors[item?.id]?.message}
                        />
                      ) : (
                        <FormControl>
                          <InputLabel>{item?.Field?.label}</InputLabel>
                          <Select {...field} {...item?.Field}>
                            {item?.Field?.options?.map((i, k) => (
                              <MenuItem key={k} value={i.value}>
                                {i.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )
                    }
                  />
                ))}
                {/* {forms.map((item, index) =>
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
                )} */}
                {user?.profile?.company?.userType == "admin" ? (
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={!isDirty}
                  >
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
    </Box>
  );
}

Company.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;
