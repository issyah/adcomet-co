/**
 * A delete user dialog prompt to confirm deletion of user*/
import { Close } from "@mui/icons-material";
import { Box, Button, CircularProgress, Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import { useState } from "react";




export default function DeleteUserDialog({
  open,
  setOpen,
  selectedUser,
  users,
  setUsers,
}) {
  const [loading, setLoading] = useState(false);
  const handleClose = () => { setOpen(false) }
  const handleSubmit = async() => {
    setLoading(true);

    // test clear user from list 
    // setTimeout(() => {
    //   handleClose();
    //   const updatedUser = users?.filter((i) => i.id !== selectedUser?.id);
    //   setUsers(updatedUser);
    // }, 1000);
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='sm'
      fullWidth
    >
      <DialogContent>
        <Box display='flex' alignItems='center' justifyContent='space-between' flexWrap='wrap' mb={2}>
          <Typography variant='h5' fontWeight='900'>Delete {selectedUser?.email}</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <Typography>Are you sure you want to delete {selectedUser?.firstName}? The user will not be able to access his dashboard. Creatives and campaigns uploaded by {selectedUser?.firstName} will still be available for usage.</Typography>
        <Box display='flex' alignItems={'center'} gap={1} flexWrap='wrap' justifyContent='end'>
          <Button variant='text' onClick={handleClose}>Cancel</Button>
          <Button variant='outlined' onClick={handleSubmit} color="error" startIcon={loading && <CircularProgress color='inherit' size={16}/>}>Delete {selectedUser?.email}</Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}