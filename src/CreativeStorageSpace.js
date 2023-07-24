/**
 * The storage meter for the main drawer*/
import { Cloud } from "@mui/icons-material";
import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useContextProvider } from "../context/ContextProvider";
import { formatBytes } from "./common";
export default function CreativeStorageSpace(props) {
  const { storage, setStorage } = useContextProvider();
  const { current, max } = storage;
  const handleValueState = () => {
    if (current && max) {
      return current / max;
    } else {
      return 0;
    }
  };
  return (
    <Box sx={{ mt: 2, px: 5, color: "grey.100", textAlign: "center" }}>
      <Typography
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Cloud />
        Creative storage
      </Typography>
      <LinearProgress
        sx={{ mt: 1 }}
        variant="determinate"
        value={handleValueState}
      />
      <Typography sx={{ mt: 1, display: "block" }} variant="caption">
        {current}MB / {max}MB
      </Typography>
    </Box>
  );
}
