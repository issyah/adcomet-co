/**
 * Get more information about the ads*/

import { useContextProvider } from "@/context/ContextProvider";
import AdSpacePricingCard from "@/src/AdSpacePricingCard";
import AdSpaceDetail from "@/src/AdSpaceDetail";
import Link from "@/src/Link";
import { getData } from "@/src/firebase-func";
import AuthLayout from "@/src/layout/AuthLayout";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const View = ({ }) => {
  const router = useRouter();
  const { id } = router.query;
  const { setLoading, setAlert } = useContextProvider();
  const [data, setData] = useState();
  const fetchData = async () => {
    setLoading(true);
    const { result, error } = await getData("adspaces", id);
    if (error) {
      setLoading(false);
      setAlert({
        open: true,
        message: error.message,
        status: 'error'
      });
      return;
    }
    if (!result.exists()) {
      router.push('/404')
      return;
    };

    setData({
      ...result.data(),
      id: result.id
    });
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [router.isReady]);

  return (
    <Box>
      <Button startIcon={<ArrowBack />} onClick={() => router.back()} sx={{
        mb: 1
      }}>
        Go back
      </Button>
      {data?.name &&
        <AdSpaceDetail
          data={data}
        >
          <AdSpacePricingCard
            price={data?.price}
          />
        </AdSpaceDetail>
      }
    </Box>
  )
}

export default View;
View.getLayout = (page) => <AuthLayout>{page}</AuthLayout>