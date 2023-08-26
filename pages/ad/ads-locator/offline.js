import { useContextProvider } from "@/context/ContextProvider";
import AdSpaceCard from "@/src/AdSpaceCard";
import MapComponent from "@/src/MapComponent";
import { getLiveAdSpaces } from "@/src/firebase-func";
import AuthLayout from "@/src/layout/AuthLayout";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Search } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputAdornment,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const Offline = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("created");
  const { setAlert } = useContextProvider();
  const fetchData = async () => {
    setLoading(true);
    const { result, error } = await getLiveAdSpaces(sort);
    if (error) {
      setLoading(false);
      setAlert({
        open: true,
        status: "error",
        message: error.message,
      });
      return;
    }
    // success. map the data
    const newData = result.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        created: data?.created.toDate(),
      };
    });
    setLocations(newData);
    setLoading(false);
  };
  const defaultMapProps = {
    center: {
      lat: 1.3562738,
      lng: 103.8156335,
    },
    zoom: 12,
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <Typography variant="h3" component={"h1"} fontWeight={"bold"}>
        Ads Locator
      </Typography>
      <Typography gutterBottom>Offline Listings</Typography>
      <Grid container spacing={0.5}>
        <Grid item md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Filter by</InputLabel>
            <Select
              size="small"
              label={"Filter by"}
              sx={{
                bgcolor: "#FFF",
                overflow: "hidden",
                borderRadius: 10,
              }}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value={"created"}>Created</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={3}>
          <TextField
            fullWidth
            size="small"
            InputProps={{
              sx: {
                bgcolor: "#FFF",
                borderRadius: 10,
              },
              placeholder: "Try Suntec City",
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            name="search"
          />
        </Grid>
      </Grid>
      <Card sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item lg={7} md={8} xs={12}>
            {!!loading &&
              [...new Array(3)].map((index) => (
                <Card key={index}>
                  <CardContent>
                    <Skeleton variant="rectangular" height={180} />
                  </CardContent>
                </Card>
              ))}
            {!!locations.length &&
              locations.map((item, index) => (
                <AdSpaceCard
                  key={index}
                  item={item}
                  pathname={"/ad/ads-locator/view"}
                  horizontal
                  showPricing
                  showCompany
                />
              ))}
          </Grid>
          <Grid item lg={5} md={4}>
            <Wrapper
              libraries={["marker", "maps", "geometry"]}
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}
            >
              <MapComponent
                center={defaultMapProps.center}
                zoom={defaultMapProps.zoom}
                height={800}
                markers={locations}
              />
            </Wrapper>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default Offline;
Offline.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;