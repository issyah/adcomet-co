/**
 * Upload media For ad space 
**/

import { useContextProvider } from "@/context/ContextProvider";
import { Photo } from "@mui/icons-material";
import { Card, CardContent, Typography, Button, Box, Grid } from "@mui/material";
import { useState } from 'react';
import { bytesToMegaBytes } from "./common";

const AdSpaceMedia = ({
  files,
  setFiles,
  setTab
}) => {


  const { setAlert } = useContextProvider();
  const [loading, setLoading] = useState(false);
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const type = file?.type;
    const size = file?.size;
    const acceptFileFormat = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
    ];

    if (bytesToMegaBytes(size) > 2) {
      setAlert({
        open: true,
        message: "Image size is too big. Please upload a smaller size image.",
        status: 'error'
      });
      return;
    }

    if (!acceptFileFormat.includes(type)) {
      setAlert({
        open: true,
        message: `File format ${type} is not supported.`,
        status: "error"
      })
      return;
    }
    const img = URL.createObjectURL(file);
    const obj = {
      file: file,
      src: img,
    };

    setFiles([
      ...files,
      obj
    ]);


  };
  return (
    <Card>
      <CardContent>
        <Typography variant='h4'>Upload Media</Typography>
        <Typography>Upload at least one image for the ad space for advertisers to view.</Typography>
        <Box mt={2}>
          <Typography variant='body2'>{files.length} / 4</Typography>
          <Grid container spacing={2}>
            {!!files &&
              files.map((item, index) => (
                <Grid item md={6} xs={12} key={index}>
                  <Box sx={{
                    'img': {
                      width: '100%',
                      height: '160px',
                      objectFit: 'cover',
                      borderRadius: 1,
                    }
                  }}>
                    <img src={item.src} alt={`Media-${index}`} />
                  </Box>
                </Grid>
              ))
            }
            {files.length < 4 &&
              <Grid item md={6} xs={12}>
                <Button fullWidth sx={{
                  height: '160px'
                }} variant='outlined' component='label'>
                  <Photo />
                  <input name={`uploadMedia`} accept=".jpeg,.jpg,.png,.gif" onChange={handleFileUpload} type='file' style={{ display: 'none' }} />
                </Button>
              </Grid>
            }
          </Grid>
        </Box>
        <Typography variant='caption'>File size not more than 2MB.</Typography>
        <Button onClick={() => setTab('pricing')} disabled={files.length == 0} variant='contained' fullWidth sx={{ mt: 2 }}>Continue</Button>
      </CardContent>
    </Card>
  )
}


export default AdSpaceMedia;