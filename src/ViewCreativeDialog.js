/**
 * A generic view creative dialog*/
import { Close } from "@mui/icons-material";
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
}) {
  const handleClose = () => {
    setSelectedCreative();
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
        ".MuiBackdrop-root" : {
          background: 'rgba(0,0,0,0.8)',
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
          <Typography variant="h4">{selectedCreative?.name}</Typography>
          <IconButton onClick={handleClose} color="inherit">
            <Close />
          </IconButton>
        </Box>
        {/* need to determine the file type to see how to render */}
        <Box sx={{
          mt:4
        }}>
          {isImage(selectedCreative?.contentType) && (
            <img
              src={selectedCreative.url}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
