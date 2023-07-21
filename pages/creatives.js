/**
 * The page to manage assets of the company
 **/
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import AuthLayout from "../src/layout/AuthLayout";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { useContextProvider } from "../context/ContextProvider";
import { getCreativesByCompany, uploadCreatives } from "../src/firebase-func";
import { useEffect, useState } from "react";
export default function Creatives(props) {
  const { setLoading, company, setAlert, loading } = useContextProvider();
  const [creatives, setCreatives] = useState([]);

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
      const newData = result?.docs.map((doc) => doc.data());
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
    setCreatives([
      ...creatives,
      ...[data]
    ])
  };

  useEffect(() => {
    handleFetchCreatives();
  }, []);
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
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {creatives.map((item, index) => (
            <Grid item md={3} key={index}>
              <Card>
                <CardMedia
                  sx={{
                    height: "250px",
                  }}
                  image={item?.url}
                  title={item?.metadata?.name}
                />
                <CardContent>name: {item?.metadata?.name}</CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {!loading && !creatives && (
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
