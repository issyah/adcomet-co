import { useContextProvider } from "@/context/ContextProvider";
import AdSpaceCard from "@/src/AdSpaceCard";
import MapComponent from "@/src/MapComponent";
import { getCountLiveAdSpaces, getLiveAdSpaces } from "@/src/firebase-func";
import AuthLayout from "@/src/layout/AuthLayout";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
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
import { useEffect, useRef, useState } from "react";

const Offline = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("created");
  const [search, setSearch] = useState();
  const { setAlert } = useContextProvider();
  const [count, setCount] = useState(0)
  const form = useRef();
  const fetchData = async () => {
    setLoading(true);
    setLocations([]);
    setCount(0);
    // get count 
    const { result: count, error: countError } = await getCountLiveAdSpaces({ sort, search });
    if (count?.data()?.count) {
      setCount(count.data()?.count);
    }

    const { result, error } = await getLiveAdSpaces({ sort, search });
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

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const value = form.search.value;
    setSearch(value);
  };

  const handleClearSearch = () => {
    setSearch();
    form.current.search.value = "";
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
  }, [sort, search]);

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
        <Grid item md={3} component={"form"} onSubmit={handleSearch} ref={form}>
          <TextField
            fullWidth
            size="small"
            name="search"
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
              endAdornment: (
                <InputAdornment position="end">
                  {search && search.length && (
                    <Button onClick={handleClearSearch}>Clear</Button>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item lg={7} md={8} xs={12}>
          {!loading &&
            <Typography gutterBottom>
              Showing <b>{count}</b> results
            </Typography>
          }
          <Grid container spacing={2}>
            {!!loading &&
              [...new Array(3)].map((index) => (
                <Grid item lg={6} md={12} key={index}>
                  <Card key={index}>
                    <CardContent>
                      <Skeleton variant="rectangular" height={180} />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            {!!locations.length &&
              locations.map((item, index) => (
                <Grid item lg={6} md={12} key={index}>
                  <AdSpaceCard
                    key={index}
                    item={item}
                    pathname={"/ad/ads-locator/view"}
                    showPricing
                    showCompany
                  />
                </Grid>
              ))
            }
          </Grid>
        </Grid>
        <Grid item lg={5} md={4}>
          <Card sx={{
            position: 'sticky',
            top: 64,
            width: '100%',
            height: 'calc(100vh'
          }}>
            <Wrapper
              libraries={["places", "marker", "maps", "geometry"]}
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}
            >
              <MapComponent
                center={defaultMapProps.center}
                zoom={defaultMapProps.zoom}
                height={800}
                markers={locations}
                role={"advertiser"}
              />
            </Wrapper>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Offline;
Offline.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;
