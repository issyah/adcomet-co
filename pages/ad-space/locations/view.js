/**
 * View the ad space by id*/
import { useContextProvider } from "@/context/ContextProvider";
import AdSpaceSummary from "@/src/AdSpaceSummary";
import { getData } from "@/src/firebase-func";
import AuthOwnerLayout from "@/src/layout/AuthOwnerLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import ImageViewDialog from "@/src/ImageViewDialog";
import { ArrowBack, EditOutlined, TvOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import Link from "@/src/Link";
import AdSpaceDetail from "@/src/AdSpaceDetail";
const View = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({});
  const [images, setImages] = useState([]);
  const { setAlert, setLoading } = useContextProvider();
  const [viewImage, setViewImage] = useState();
  const [showEditPrompt, setShowEditPrompt] = useState(false);
  // set up the form
  const { control, reset, setValue } = useForm();

  const handleEditButton = () => {
    if (data.status == "live") {
      setShowEditPrompt(true);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const { result, error } = await getData("adspaces", id);
    if (error) {
      setLoading(false);
      setAlert({
        open: true,
        message: error.message,
        status: "error",
      });
      return;
    }
    if (!result.exists()) {
      router.push("/404");
    }
    // pull data ;
    if (result.exists()) {
      setData({
        ...result.data(),
        id: result.id,
      });
      reset({
        ...result.data(),
      });
      setImages([...result.data().media]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady]);
  return (
    <Box>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item md={"auto"}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href={"/ad-space/locations"}
          >
            Go back
          </Button>
        </Grid>
        <Grid item md="auto">
          <Grid container spacing={1}>
            <Grid item xs="auto">
              <Button variant="outlined" startIcon={<EditOutlined />}>
                Edit
              </Button>
            </Grid>
            <Grid item xs="auto">
              <Tooltip
                title={
                  "Generate a link to display approved campaigns on your digital board."
                }
                arrow
              >
                <Button
                  component={Link}
                  href={`/display/offline/?id=${id}&width=${data?.width}&height=${data?.height}`}
                  variant="contained"
                  startIcon={<TvOutlined />}
                  target={"_blank"}
                >
                  Get display link
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{
          borderRadius: 1,
          p: 2,
          bgcolor: "#FFF",
          my: 2,
        }}
      >
        <Breadcrumbs>
          <Link href="/ad-space/locations">Ad-Spaces</Link>
          <Typography>{data.name}</Typography>
        </Breadcrumbs>
      </Box>
      {data.name && (
        <AdSpaceDetail
          data={data}
          showCreatedBy
          setViewImage={setViewImage}
          showStaticMap
        />
      )}
      <ImageViewDialog
        open={!!viewImage}
        setOpen={setViewImage}
        src={viewImage}
        alt={data.name}
      />
    </Box>
  );
};

export default View;
View.getLayout = (page) => <AuthOwnerLayout>{page}</AuthOwnerLayout>;
