/**
 * The main search function for the main dashboard
 **/
import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  Box,
  Grid,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import searchPage from "../src/json/serach-page.json";
import Link from "next/link";
export default function SearchDialog(props) {
  const { open, setOpen } = props;
  const [search, setSearch] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState("");
  const [noResult, setNoResult] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setNoResult();
    let filtered = searchPage.filter((i) => i.id?.search(search) != -1);
    setResult(filtered);
    if (!result?.length) {
      setNoResult(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!search) {
      setResult();
      setNoResult(false);
    }
    setResult();
  }, [search]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5">Search</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <Grid
          container
          gap={1}
          sx={{
            mt: 1,
          }}
          component={"form"}
          onSubmit={handleSubmit}
        >
          <Box flexGrow={1}>
            <TextField
              type="text"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              label="Search"
            />
          </Box>
          <Box>
            <Button variant="contained" type="submit">
              Search
            </Button>
          </Box>
        </Grid>
        <Box>
          {loading && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <CircularProgress />
            </Box>
          )}
          {result?.length ? (
            <List>
              {result?.map((item, index) => (
                <ListItemButton href={item?.href} component={Link} key={index}>
                  <ListItem>
                    <ListItemText>
                      <Typography variant="h5" gutterBottom>
                        {item?.name}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {item?.description}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                    </ListItemText>
                  </ListItem>
                </ListItemButton>
              ))}
            </List>
          ) : (
            <Box>{noResult && <Typography>No results found</Typography>}</Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
