/**
 * A generic view creative dialog*/
import { Close  } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
          <Typography variant="h4" sx={{
            overflow:'hidden',
            whiteSpace:'nowrap',
            textOverflow: 'ellipsis',
          }}>
            <IconButton onClick={handleClose} color="inherit" size="large">
              {/* <KeyboardArrowLeftOutlined />
               */}
               <ArrowBackIcon />
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
            <Box
              component={'img'}
              src={selectedCreative?.url}
              sx={{
                mx:'auto',
                display: 'block',
                width: '100%',
                height: {
                  height:'100%',
                  md: 'calc(100vh - 80px)'
                },
                objectFit:'contain'
              }}
              alt={selectedCreative?.name}
            />
            // <img
            //   src={selectedCreative.url}
            //   style={{
            //     marginLeft: "auto",
            //     marginRight: "auto",
            //     display: "block",
            //     width: "100%",
            //     height: {
            //       md: "calc(100vh - 64px)",
            //     },
            //     objectFit: "contain",
            //   }}
            // />
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
