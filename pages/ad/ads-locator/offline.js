import { useContextProvider } from "@/context/ContextProvider";
import AdSpaceCard from "@/src/AdSpaceCard";
import { getLiveAdSpaces } from "@/src/firebase-func";
import AuthLayout from "@/src/layout/AuthLayout";
import { Box, Card, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";



const Offline = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('created');
  const { setAlert } = useContextProvider();
  const fetchData = async () => {
    setLoading(true);
    const { result, error } = await getLiveAdSpaces(sort);
    if (error) {
      setLoading(false);
      setAlert({
        open: true,
        status: 'error',
        message: error.message
      });
      return;
    }
    // success. map the data 
    const newData = result.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        created: data?.created.toDate()
      }
    })
    setLocations(newData);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Box>
      <Typography variant='h3' component={'h1'} fontWeight={'bold'}>Offline Ads Locator</Typography>
      <Grid container spacing={2}>
        {!!loading &&
          [...new Array(3)].map((index) => (
            <Grid item key={index} lg={4} md={6} xs={12}>
              <Card>
                <CardContent>
                  <Skeleton variant='rectangular' height={180} />
                </CardContent>
              </Card>
            </Grid>
          ))
        }
        {!!locations.length &&
          locations.map((item, index) => (
            <Grid item key={index} lg={4} md={6} xs={12}>
              <AdSpaceCard item={item} pathname={'/ad/ads-locator/view'}/>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}


export default Offline;
Offline.getLayout = (page) => <AuthLayout>{page}</AuthLayout>