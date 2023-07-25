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
import { useState } from "react";
import { red } from "@mui/material/colors";
export default function CreativeCard({ item, setSelectedCreative }) {
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);

  const handleCloseMenu = () => {
    setAnchorEl();
  };

  const handleClickMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleDownloadFile = () => {
    handleCloseMenu();
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open("GET", item.url)
    xhr.send();
    // const a = document.createElement("a");
    // a.href = item.url;
    // a.download = item.name;
    // a.setAttribute("target", "_blank");
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
  };

  return (
    <Card
      sx={{
        ".MuiCardHeader-content": {
          display: "block",
          overflow: "hidden",
        },
        ".MuiCardHeader-title, .MuiCardHeader-subheader": {
          typography: "body1",
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
        <MenuItem onClick={handleDownloadFile}>Download file</MenuItem>
        <MenuItem sx={{ color: red[500] }}>Delete file</MenuItem>
      </Menu>
      <CardHeader
        title={item?.name}
        subheader={
          <Box display={"flex"} alignItems="center" gap={1}>
            <AccountCircleOutlined />
            <Typography>{item?.uploadedBy}</Typography>
          </Box>
        }
        action={
          <IconButton onClick={handleClickMenu}>
            <MoreVertOutlined />
          </IconButton>
        }
      />
      <CardActionArea onClick={() => setSelectedCreative(item)}>
        <CardMedia
          sx={{
            height: "250px",
          }}
          image={item?.url}
          title={item?.name}
          alt={item?.name}
        />
        <CardContent>
          <Stack spacing={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <Tooltip title={"File type"}>
                <InsertPhotoOutlined />
              </Tooltip>
              <b>{item?.contentType}</b>
            </Box>
            <Box alignItems="center" display="flex" gap={1}>
              <Tooltip title="File size">
                <SdStorageOutlined />
              </Tooltip>
              <b>{bytesToMegaBytes(item?.size)}MB</b>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
