/**
 * The card component for creative page*/
import {
  Card,
  CardActionArea,
  CardHeader,
  Box,
  Typography,
  CardMedia,
  CardContent,
  Stack,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import {
  InsertPhotoOutlined,
  SdStorageOutlined,
  MoreVertOutlined,
} from "@mui/icons-material";
import { bytesToMegaBytes } from "./common";
import { useRef, useState } from "react";
import { red } from "@mui/material/colors";
export default function CreativeCard({
  item,
  setSelectedCreative,
  setOpenDeleteCreative,
  setOpenViewDialog,
  setOpenRenameDialog
}) {
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);

  const titleRef = useRef();

  const handleCloseMenu = () => {
    setAnchorEl();
  };

  const handleClickMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleDownloadFile = (item) => {
    const url = item?.url;
    if (url) {
      const a = document.createElement("a");
      a.href = url;
      a.download = item?.name;
      a.target = "_blank";
      a.setAttribute("style", "display:none");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    //   const xhr = new XMLHttpRequest();
    //   xhr.responseType = 'blob';
    //   xhr.onload = (event) => {
    //     const blob = xhr.response;
    //   };
    //   xhr.open('GET', url);
    //   xhr.send();
    // }
  };
  const handleViewFile = () => {
    setOpenViewDialog(true);
    setSelectedCreative(item);
  };
  const handleDeleteFile = () => {
    setAnchorEl();
    setSelectedCreative(item);
    setOpenDeleteCreative(true);
  };
  const handleRename = () => {
    setAnchorEl();
    setSelectedCreative(item);
    setOpenRenameDialog(true);
  };
  return (
    <Card
      sx={{
        ".MuiCardHeader-content": {
          display: "block",
          overflow: "hidden",
        },
        ".MuiCardHeader-title, .MuiCardHeader-subheader": {
          typography: {
            md: "body1",
            xs: "caption",
          },
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        },
      }}
    >
      <Menu
        open={open}
        anchorEl={anchorEl}
        anchorPosition={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleRename()}>Rename</MenuItem>
        <MenuItem onClick={() => handleDownloadFile(item)}>
          Download file
        </MenuItem>
        <MenuItem onClick={() => handleDeleteFile()} sx={{ color: red[500] }}>
          Delete file
        </MenuItem>
      </Menu>
      <CardHeader
        title={
          <Typography
            ref={titleRef}
            sx={{
              textOverflow: "ellipsis",
              display: "block",
              overflow: "hidden",
            }}
          >
            {item?.name}
          </Typography>
        }
        subheader={item?.uploadedBy}
        action={
          <IconButton onClick={handleClickMenu}>
            <MoreVertOutlined />
          </IconButton>
        }
      />
      <CardActionArea onClick={handleViewFile}>
        <CardMedia
          sx={{
            height: {
              md: "250px",
              xs: "120px",
            },
          }}
          image={item?.thumbUrl ? item?.thumbUrl : item?.url}
          title={item?.name}
          alt={item?.name}
        />
        <CardContent>
          <Stack spacing={1}>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              typography={"caption"}
            >
              <Tooltip title={"File type"}>
                <InsertPhotoOutlined />
              </Tooltip>
              {item?.contentType}
            </Box>
            <Box
              alignItems="center"
              display="flex"
              gap={1}
              typography={"caption"}
            >
              <Tooltip title="File size">
                <SdStorageOutlined />
              </Tooltip>
              {item?.size}MB
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
