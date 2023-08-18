/**
 * View the ad space by id*/
import { useContextProvider } from "@/context/ContextProvider";
import AdSpaceSummary from "@/src/AdSpaceSummary";
import { getData } from "@/src/firebase-func";
import AuthOwnerLayout from "@/src/layout/AuthOwnerLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ImageViewDialog from "@/src/ImageViewDialog";
import { ArrowBack } from "@mui/icons-material";
import Link from "@/src/Link";
const View = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({});
  const [images, setImages] = useState([]);
  const { setAlert, setLoading } = useContextProvider();
  const [viewImage, setViewImage] = useState();
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
    // pull data ;
    if (result.exists()) {
      setData({
        ...result.data(),
        id: result.id,
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
      <Button variant="contained" startIcon={<ArrowBack />} component={Link} href={'/ad-space/locations'}>Go back</Button>
      <Typography variant='h3' gutterBottom>{data.name}</Typography>
      {data.name && <AdSpaceSummary setViewImage={setViewImage} readOnly data={data} files={images} />}
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
