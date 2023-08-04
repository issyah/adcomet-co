/**
 * Rename dialog component,
 * used in renaming creative assets*/
import { useContextProvider } from "@/context/ContextProvider";
import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Typography,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { updateData } from "./firebase-func";
export default function RenameDialog({
  item,
  open,
  setOpen,
  setCreatives,
  creatives,
}) {
  const { setAlert } = useContextProvider();
  const handleClose = () => {
    setOpen(false);
  };
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data) => {
    const { name } = data;
    setLoading(true);
    const { result, error } = await updateData("creatives", item?.id, {
      name: name,
    });

    setAlert({
      status: error ? "error" : "success",
      message: error ? error.message : "Filename has been updated!",
      open: true,
    });
    setLoading(false);
    if (error) {
      return;
    }
    handleClose();
    // update the creatives section
    const findIndex = creatives?.findIndex((i) => i.id === item?.id);
    let updatedCreatives = creatives;
    if (findIndex !== -1) {
      updatedCreatives[findIndex] = {
        ...updatedCreatives[findIndex],
        name: name,
      };
    }
    setCreatives(updatedCreatives);
  };

  useEffect(() => {
    reset({
      name: item?.name,
    });
  }, [item]);
  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <DialogContent>
        <Grid
          spacing={2}
          flexWrap="wrap"
          justifyContent={"space-between"}
          sx={{ mb: 2 }}
          container
        >
          <Grid item md="auto">
            <Typography variant="h5">Rename</Typography>
          </Grid>
          <Grid item md="auto">
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
        <Box mb={2} component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Please fill in the file name",
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                label={"Filename"}
                error={errors?.name}
                helperText={errors?.name?.message}
              />
            )}
          />
          <Box mt={2} textAlign={"right"}>
            <Button
              variant="contained"
              disabled={!isDirty}
              type="submit"
              startIcon={
                loading && <CircularProgress color="inherit" size={16} />
              }
            >
              Submit
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
