/**
 * The page to manage assets of the company
 **/
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Stack,
  Tooltip,
  Container,
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
import ViewCreativeDialog from "../src/ViewCreativeDialog";
import CreativeCard from "../src/CreativeCard";
import CreativeDeleteDialog from "../src/CreativeDeleteDialog";
export default function Creatives(props) {
  const { setLoading, company, setAlert, loading } = useContextProvider();
  const [creatives, setCreatives] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [layout, setLayout] = useState("card");
  const [selectedCreative, setSelectedCreative] = useState();
  const [openDeleteCreative, setOpenDeleteCreative] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);

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
      render: (size) => <Typography>{bytesToMegaBytes(size)}MB</Typography>,
    },
    {
      label: "Content-type",
      id: "contentType",
    },
    {
      label: "",
      id: "id",
      render: (id) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Button onClick={() => handleTableAction(id, 'view-creative')}>
            View
          </Button>
          <IconButton
            color="error"
            onClick={() => handleTableAction(id, "delete-creative")}
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleTableAction = (id, type) => {
    const item = creatives?.find((i) => i.id == id);
    setSelectedCreative(item);
    if (type == "view-creative") {
      setOpenViewDialog(true);
    } else if (type == "delete-creative") {
      setOpenDeleteCreative(true);
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
      setCreatives(newData);
    }

    setLoading(false);
  };

  const handleFileUpload = async (e) => {
    setUploadLoading(true);
    const file = e.target.files[0];
    const { error, data } = await uploadCreatives(company?.id, file);
    if (error) {
      setAlert({
        open: true,
        message: error?.message,
        status: "error",
      });
      setUploadLoading(false);
      return;
    }
    // success
    setAlert({
      open: true,
      message: "File uploaded successfully!",
      status: "success",
    });
    setUploadLoading(false);
    // add to creatives
    setCreatives([...[data], ...creatives]);
  };

  useEffect(() => {
    if (company?.id) {
      handleFetchCreatives();
    }
  }, [company]);

  return (
    <Box>
      <ViewCreativeDialog
        open={openViewDialog}
        setOpen={setOpenViewDialog}
        selectedCreative={selectedCreative}
        setSelectedCreative={setSelectedCreative}
      />
      <CreativeDeleteDialog
        open={openDeleteCreative}
        setOpen={setOpenDeleteCreative}
        selectedCreative={selectedCreative}
        setCreatives={setCreatives}
        creatives={creatives}
      />
      <Box
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
        flexWrap="wrap"
        gap={2}
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
      <Box sx={{ my: 2 }}>
        <Button variant="contained" component={"label"}>
          Add creatives{" "}
          <input
            onChange={handleFileUpload}
            accept={".jpg,.jpeg,.png,.gif, .mp4"}
            type={"file"}
            style={{ display: "none" }}
            id={"upload-creative"}
          />
        </Button>
      </Box>
      {creatives && (
        <Box>
          {layout == "card" && (
            <Grid container spacing={2}>
              {uploadLoading && (
                <Grid item md={4} lg={3} xs={6}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Skeleton variant={"line"} sx={{ mb: 2 }} />
                      <Skeleton variant={"line"} sx={{ mb: 2 }} />
                      <Skeleton variant="box" sx={{ mb: 2, height:{
                        md: 250,
                        xs: 120
                      } }} />
                      <Skeleton variant={"line"} />
                    </CardContent>
                  </Card>
                </Grid>
              )}
              {creatives.map((item, index) => (
                <Grid item md={4} lg={3} xs={6} key={index}>
                  <CreativeCard
                    item={item}
                    setOpenDeleteCreative={setOpenDeleteCreative}
                    setSelectedCreative={setSelectedCreative}
                    setOpenViewDialog={setOpenViewDialog}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          {layout == "list" && (
            <Card sx={{ mt: 2 }}>
              <Box sx={{ overflow: "auto" }}>
                <Box
                  sx={{
                    width: "100%",
                    display: "table",
                    tableLayout: "fixed",
                  }}
                >
                  <DataGrid
                    tableProps={{
                      size: "small",
                    }}
                    header={headers}
                    data={creatives}
                  />
                </Box>
              </Box>
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
    </Box>
  );
}

Creatives.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;
