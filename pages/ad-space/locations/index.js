/**
 * The main page to manage ad locations for ad space owners 
**/
import AuthOwnerLayout from "@/src/layout/AuthOwnerLayout";
import { Box, Button, Card, CardContent, Chip, CircularProgress, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { getAdSpacesByCompany, getLocationsByCompany } from "@/src/firebase-func";
import { useEffect, useState } from "react";
import { useContextProvider } from "@/context/ContextProvider";
import DataGrid from "@/src/DataGrid";
import Link from "@/src/Link";
import { Add, FolderOpenOutlined, Man2Outlined, PinDropOutlined, Search, Woman2Outlined } from "@mui/icons-material";
import { formatNumber } from "@/src/common";
import AdSpaceCard from "@/src/AdSpaceCard";


export default function Location() {
  const [locations, setLocations] = useState([]);
  const { company, setAlert } = useContextProvider();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [status, setStatus] = useState('all');
  const fetchData = async () => {
    setLoading(true);
    // clear current data set 
    setLocations([]);
    const { result, error } = await getAdSpacesByCompany({
      id: company.id,
      status,
      search,
    });
    if (error) {
      setLoading(false);
      setAlert({
        open: true,
        message: error.message,
        status: 'error'
      });
      return;
    }
    //  success 
    if (result) {
      console.log(result);
      const newData = result?.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          created: data?.created.toDate()
        }
      });
      setLocations(newData);
      setLoading(false);
    }
  }
  // define the headers for the tables
  const handleSearch = async (e) => {
    e.preventDefault();
    const form = e.target;
    const search = form.search.value;
    setSearch(search);
  }
  const headers = [
    {
      label: 'Name',
      id: 'name',
      render: (item) => (
        <Box>
          {/* only render the first image */}
          {item.media?.length &&
            <Box sx={{
              height: '120px',
              width: '180px',
              'img': {
                borderRadius: 1,
                height: '100%',
                width: '100%',
                objectFit: 'cover',
                boxShadow: 1
              }
            }}
            >
              <Link href={`/ad-space/locations/view/?id=${item.id}`}>
                <img src={item.media[0].src} />
              </Link>
            </Box>
          }
          <Link sx={{ fontWeight: "bold", typography: 'h6' }} href={`/ad-space/locations/view/?id=${item.id}`}>{item.name}</Link>
          <Typography variant="body2">{item?.description > 50 ? `${item.description?.substring(0, 50)}...` : item?.description}</Typography>
        </Box>
      )
    },
    {
      label: "Address",
      render: (item) => (
        <Typography sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5
        }}><PinDropOutlined /> {item.address}</Typography>
      )
    },
    {
      label: "Impressions",
      render: (item) => (
        <Box>
          <Typography gutterBottom variant="h6">{formatNumber(item.impressions)}</Typography>
          <Box display='flex' alignItems='center' gap={1}>
            <Stack spacing={0.5} direction='row'>
              <Man2Outlined color='primary' />
              <Typography >{item.malePercentage}%</Typography>
            </Stack>
            <Stack spacing={0.5} direction={'row'}>
              <Woman2Outlined color='primary' />
              <Typography>{item.femalePercentage}%</Typography>
            </Stack>
          </Box>
        </Box>
      )
    },
    {
      label: 'Demographics',
      render: (item) => (
        <Box>
          {item.demographics?.length &&
            item.demographics.map((item) => (
              <Chip
                color={'primary'}
                size='small'
                variant="outlined"
                key={item.id}
                label={item.label}
              />
            ))
          }
        </Box>
      )
    }
  ]

  useEffect(() => {
    if (company.id) {
      fetchData();

    }
  }, [company, status, search])



  return (
    <Box>
      <Grid container spacing={2} justifyContent={'space-between'} alignItems={'center'}>
        <Grid item md={'auto'} xs={12}>
          <Typography variant='h3' fontWeight={900}>Ad Space Locations</Typography>
          <Typography gutterBottom>Manage and add new ad location.</Typography>
        </Grid>
        <Grid item md={'auto'} xs={12}>
          <Button startIcon={<Add />} variant='contained' component={Link} href='/ad-space/locations/create'>Add Ad Space</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item md={4} component={'form'} onSubmit={handleSearch}>
          <TextField
            name={'search'}
            fullWidth
            variant="outlined"
            InputProps={{
              placeholder: "Search for location",
              sx: {
                bgcolor: '#FFF'
              },
              startAdornment: (
                <InputAdornment position="start"><Search /></InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  {search && search.length &&
                    <Button onClick={() => setSearch()}>Clear</Button>
                  }
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item md={2}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label={'Status'}
              inputProps={{
                sx: {
                  bgcolor: '#FFF'
                }
              }}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value={'all'}>All</MenuItem>
              <MenuItem value={'live'}>Live</MenuItem>
              <MenuItem value={'draft'}>Draft</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {!!loading &&
          [...new Array(3)].map((index) => (
            <Grid item lg={4} md={6} sm={6} xs={12} key={index}>
              <Card>
                <CardContent>
                  <Skeleton variant="rectangular" height={180} />
                </CardContent>
              </Card>
            </Grid>
          ))
        }
        {!!locations.length &&
          locations.map((item, index) => (
            <Grid item lg={4} md={6} sm={6} xs={12} key={index}>
              <AdSpaceCard
                item={item}
              />
            </Grid>
          ))
        }
      </Grid>
      {!!!loading && !!!locations.length &&
        <Card>
          <CardContent>
            <FolderOpenOutlined sx={{ fontSize: 32 }} />
            {status !== 'all' || !!!search ?
              <Box>
                <Typography variant='h6' gutterBottom>No ad space locations found.</Typography>
              </Box> :
              <Box>
                <Typography variant='h6' gutterBottom>No ad space locations added.</Typography>
                <Button component={Link} variant='outlined' href='/ad-space/locations/create' startIcon={<Add />}>Add Ad Space</Button>
              </Box>
            }
          </CardContent>
        </Card>
      }
      {/* <Card sx={{ mt: 2 }}>
        {loading ?
          <Box textAlign={'center'} p={2}>
            <CircularProgress color='primary' size={24} />
          </Box> :
          <DataGrid
            header={headers}
            data={locations}
          />
        }
      </Card> */}
    </Box>
  )
}


Location.getLayout = (page) => <AuthOwnerLayout>{page}</AuthOwnerLayout>