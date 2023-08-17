/**
 * Upload media For ad space
 **/

import { useContextProvider } from "@/context/ContextProvider";
import { Delete, Photo } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { bytesToMegaBytes } from "./common";

const AdSpaceMedia = ({ files, setFiles, setTab }) => {
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
        status: "error",
      });
      return;
    }

    if (!acceptFileFormat.includes(type)) {
      setAlert({
        open: true,
        message: `File format ${type} is not supported.`,
        status: "error",
      });
      return;
    }
    const img = URL.createObjectURL(file);
    const obj = {
      file: file,
      src: img,
    };
    e.target.value = "";
    setFiles([...files, obj]);
  };

  const handleDeleteImage = (index) => {
    console.log(index);
    let temp = files;
    console.log(files);
    if (temp.length) {
      temp.splice(index, 1);
      setFiles([...temp]);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Upload Media</Typography>
        <Typography>
          Upload at least one image for the ad space for advertisers to view.
        </Typography>
        <Box mt={2}>
          <Typography variant="body2">{files.length} / 4</Typography>
          <Grid container spacing={2}>
            {!!files &&
              files.map((item, index) => (
                <Grid item md={6} xs={12} key={index}>
                  <Box
                    sx={{
                      position: "relative",
                      img: {
                        width: "100%",
                        height: "160px",
                        objectFit: "cover",
                        borderRadius: 1,
                      },
                    }}
                  >
                    <img src={item.src} alt={`Media-${index}`} />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: "4px",
                        right: "4px",
                      }}
                      onClick={() => handleDeleteImage(index)}
                      title="Delete immage"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            {files.length < 4 && (
              <Grid item md={6} xs={12}>
                <Button
                  fullWidth
                  sx={{
                    height: "160px",
                  }}
                  variant="outlined"
                  component="label"
                >
                  <Photo />
                  <input
                    name={`uploadMedia`}
                    accept=".jpeg,.jpg,.png,.gif"
                    onChange={handleFileUpload}
                    type="file"
                    style={{ display: "none" }}
                  />
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
        <Typography variant="caption">File size not more than 2MB.</Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs="12" md={"2"}>
            <Button onClick={() => setTab("information")}>Go back</Button>
          </Grid>
          <Grid item xs="12" md="10">
            <Button
              onClick={() => setTab("pricing")}
              disabled={files.length == 0}
              variant="contained"
              fullWidth
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AdSpaceMedia;
