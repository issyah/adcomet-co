/**
 * The location display via SWIPER */

import { register } from "swiper/element/bundle";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Logo from "@/public/adcomet_logo-19.png";
register();
const LocationDisplay = ({ width, height, id, orientation }) => {
  const swiperRef = useRef(null);
  const swiperSlideCss = {
    height: "100%",
    width: "100%",
  };

  const swiperContainerCss = {
    height: height ? height + "px" : "100vh",
    width: width ? width + "px" : "100vw",
  };

  const demo = [1, 2, 3];
  return (
    <Box>
      {id && (
        <swiper-container
          ref={swiperRef}
          style={swiperContainerCss}
          slides-per-view={1}
          speed={500}
          autoplay-delay={5000}
          loop={true}
        >
          {demo.map((index) => (
            <swiper-slide key={index} style={swiperSlideCss}>
              <Box
                p={2}
                height="100%"
                width="100%"
                bgcolor={
                  index == 1
                    ? "primary.main"
                    : index == 2
                    ? "secondary.main"
                    : "success.main"
                }
              >
                <Grid
                  sx={{
                    height: "100%",
                    width: "100%",
                    color: "#FFF",
                  }}
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item md={10}>
                    <Box
                      sx={{
                        height: "120px",
                        img: {
                          objectFit: "contain",
                          height: "100%",
                          width: "auto",
                        },
                      }}
                    >
                      <img src={Logo.src} />
                    </Box>
                    <Typography variant="h5">
                      This is a placeholder. There are currently no campaigns
                      for this display.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </swiper-slide>
          ))}
        </swiper-container>
      )}
    </Box>
  );
};

export default LocationDisplay;
