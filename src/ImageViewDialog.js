/**
 * A generic dialog screen for viewing image */
// const { Dialo, DialogContent, Box } = require("@mui/material");
import { ArrowBack } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
const ImageViewDialog = ({ open, setOpen, src, alt }) => {
  const handleClose = () => setOpen();
  return (
    <Dialog
      scroll="body"
      onClose={handleClose}
      fullScreen
      open={open}
      sx={{
        ".MuiBackdrop-root": {
          background: "rgba(0,0,0,0.8)",
        },
        ".MuiDialog-paper": {
          background: "transparent",
          color: "#FFF",
        },
      }}
    >
      <DialogContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
          flexWrap="wrap"
        >
          <Typography
            variant="h4"
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <IconButton onClick={handleClose} color="inherit" size="large">
              <ArrowBack />
            </IconButton>
            {alt}
          </Typography>
        </Box>
        {src && (
          <Box
            component={"img"}
            src={src}
            alt={alt}
            sx={{
              mx: "auto",
              display: "block",
              width: "100%",
              height: {
                height: "100%",
                md: "calc(100vh - 80px)",
              },
              objectFit: "contain",
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewDialog;
