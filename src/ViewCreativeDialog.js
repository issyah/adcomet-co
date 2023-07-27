/**
 * A generic view creative dialog*/
import { Close, KeyboardArrowLeftOutlined } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
} from "@mui/material";

export default function ViewCreativeDialog({
  open,
  selectedCreative,
  setSelectedCreative,
  setOpen,
}) {
  const handleClose = () => {
    setSelectedCreative();
    setOpen(false);
  };
  const isImage = (contentType) => {
    if (
      contentType == "image/png" ||
      contentType == "image/jpeg" ||
      contentType == "image/jpg" ||
      contentType == "image/gif"
    ) {
      return true;
    }
    return false;
  };

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
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Typography variant="h4">
            <IconButton onClick={handleClose} color="inherit" size="large">
              <KeyboardArrowLeftOutlined />
            </IconButton>
            {selectedCreative?.name}
          </Typography>
        </Box>
        {/* need to determine the file type to see how to render */}
        <Box
          sx={{
            mt: 4,
          }}
        >
          {isImage(selectedCreative?.contentType) && (
            <img
              src={selectedCreative.url}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
                width: "100%",
                height: "100vh",
                objectFit: "contain",
              }}
            />
          )}
          {selectedCreative?.contentType == "video/mp4" && (
            <Box
              sx={{
                video: {
                  width: "100%",
                  maxHeight: "100%",
                },
              }}
            >
              <video controls>
                <source src={selectedCreative?.url} />
              </video>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
