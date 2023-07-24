/**
 * The page to manage assets of the company
 **/
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AuthLayout from "../src/layout/AuthLayout";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { useContextProvider } from "../context/ContextProvider";
import { getCreativesByCompany, uploadCreatives } from "../src/firebase-func";
import { useEffect, useState } from "react";
import { Delete, GridView, ViewList } from "@mui/icons-material";
import DataGrid from "../src/DataGrid";
import moment from "moment";
import { bytesToMegaBytes } from "../src/common";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import SdStorageOutlinedIcon from "@mui/icons-material/SdStorageOutlined";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
export default function Creatives(props) {
  const { setLoading, company, setAlert, loading } = useContextProvider();
  const [creatives, setCreatives] = useState([]);
  const [layout, setLayout] = useState("card");

  const handleChangeLayout = (type) => {
    setLayout(type);
  };

  const layoutButtons = [
    {
      icon: <GridView />,
      id: "card",
    },
    {
      icon: <ViewList />,
      id: "list",
    },
  ];

  const headers = [
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Uploaded by",
      id: "uploadedBy",
    },
    {
      label: "Created on",
      id: "created",
      render: (created) => {
        return (
          <Typography variant="body2">
            {moment(created).format("MMM DD, YYYY")}
          </Typography>
        );
      },
    },
    {
      label: "Size",
      id: "size",
      render: (size) => <Typography>{bytesToMegaBytes(size)}</Typography>,
    },
    {
      label: "Content-type",
      id: "contentType",
    },
    {
      label: "",
      id: "id",
      render: (id) => (
        <IconButton>
          <Delete />
        </IconButton>
      ),
    },
  ];

  const renderTableData = () => {
    if (creatives?.length) {
      const data = creatives.map((item) => {
        return {
          id: item?.id,
          url: item?.url || undefined,
          ...item?.metadata,
        };
      });
      return data;
    }
  };

  const handleFetchCreatives = async () => {
    if (!company?.id) {
      return;
    }
    setLoading(true);
    const { result, error } = await getCreativesByCompany(company?.id);
    if (error) {
      setAlert({
        open: true,
        status: "error",
        message: error?.message,
      });
      setLoading(false);
      return;
    }
    // success
    if (result) {
      const newData = result?.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          created: data?.created.toDate(),
        };
      });
      console.log(newData);
      setCreatives(newData);
    }

    setLoading(false);
  };

  const handleFileUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const { error, data } = await uploadCreatives(company?.id, file);
    if (error) {
      setAlert({
        open: true,
        message: error?.message,
        status: "error",
      });
      setLoading(false);
      return;
    }
    // success
    setAlert({
      open: true,
      message: "File uploaded successfully!",
      status: "success",
    });
    setLoading(false);
    // add to creatives
    setCreatives([...creatives, ...[data]]);
  };

  // useEffect(() => {
  //   handleFetchCreatives();
  // }, []);
  useEffect(() => {
    if (company?.id) {
      handleFetchCreatives();
    }
  }, [company]);

  return (
    <AuthLayout>
      <Box
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
        flexWrap="wrap"
      >
        <Box>
          <Typography variant="h3" fontWeight="900">
            Creatives
          </Typography>
          <Typography>
            Manage your digital assets and upload new assets here.
          </Typography>
        </Box>
        <Box>
          <ButtonGroup disableElevation>
            {layoutButtons?.map((item, index) => (
              <Button
                onClick={() => handleChangeLayout(item?.id)}
                variant={layout == item?.id ? "contained" : "outlined"}
                key={index}
              >
                {item.icon}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" component={"label"}>
          Add creatives{" "}
          <input
            onChange={handleFileUpload}
            accept={".jpg,.jpeg,.png,.gif"}
            type={"file"}
            style={{ display: "none" }}
            id={"upload-creative"}
          />
        </Button>
      </Box>
      {creatives && (
        <Box>
          {layout == "card" && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {creatives.map((item, index) => (
                <Grid item md={3} key={index}>
                  <Card
                    sx={{
                      ".MuiCardHeader-content": {
                        display: "block",
                        overflow: "hidden",
                      },
                      ".MuiCardHeader-title, .MuiCardHeader-subheader": {
                        typography: "body1",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      },
                    }}
                  >
                    <CardHeader
                      title={item?.name}
                      subheader={
                        <Box display={'flex'} alignItems='center' gap={1}>
                          <AccountCircleOutlinedIcon />
                          <Typography>{item?.uploadedBy}</Typography>
                        </Box>
                      }
                    />
                    <CardMedia
                      sx={{
                        height: "250px",
                      }}
                      image={item?.url}
                      title={item?.name}
                    />
                    <CardContent>
                      <Stack spacing={1}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Tooltip title="File type">
                            <InsertPhotoOutlinedIcon />
                          </Tooltip>{" "}
                          <b>{item?.contentType}</b>
                        </Box>
                        <Box alignItems={'center'} display='flex' gap={1}>
                          <Tooltip title="File size">
                            <SdStorageOutlinedIcon />
                          </Tooltip>{" "}
                          <b>{bytesToMegaBytes(item?.size)}</b>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          {layout == "list" && (
            <Card sx={{ mt: 2 }}>
              <DataGrid
                tableProps={{
                  size: "small",
                }}
                header={headers}
                data={creatives}
              />
              {/* <List>
                {creatives.map((item,index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={item?.metadata?.name}
                      secondary={item?.metadata?.contentType}
                    />
                  </ListItem>
                ))}
              </List> */}
            </Card>
          )}
        </Box>
      )}
      {!loading && creatives.length == 0 && (
        <Box
          sx={{
            mt: 2,
            borderRadius: 1,
            borderColor: "grey.300",
            borderStyle: "solid",
            p: 2,
            minHeight: "250px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box textAlign="center">
            <Box>
              <InsertDriveFileOutlinedIcon sx={{ fontSize: "36px" }} />
            </Box>
            <Typography variant="h5">No creatives uploaded.</Typography>
          </Box>
        </Box>
      )}
    </AuthLayout>
  );
}
