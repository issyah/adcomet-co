/**
 * Delete prompt for deleting creative assets
 **/
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useContextProvider } from "../context/ContextProvider";
import { deleteCreatives } from "./firebase-func";

export default function CreativeDeleteDialog({
  open,
  setOpen,
  selectedCreative,
  creatives,
  setCreatives,
}) {
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContextProvider();
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const { error, result } = await deleteCreatives(selectedCreative);
    if (error) {
      setAlert({
        open:true,
        status: 'error',
        message: error
      });
      setLoading(false);
      return;
    }

    // success 
    setAlert({
      open:true,
      status: 'success',
      message: `${selectedCreative?.name} has been deleted successfully!`
    });
    setLoading(false);
    handleClose();
    // update the creatives assets 
    const newArr = creatives?.filter((i) => i.id !== selectedCreative?.id);
    setCreatives(newArr);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <DialogContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography>Delete creative</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <Typography>
          Are you sure you want to delete {selectedCreative?.name}? The asset
          cannot be recovered once it has been deleted.
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          flexWrap="wrap"
          justifyContent={"flex-end"}
        >
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={
              loading && <CircularProgress color="inherit" size={16} />
            }
            onClick={handleSubmit}
          >
            Delete creative
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
