/**
 * Not authorized to view this resource*/
import { ErrorOutlineOutlined } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import Link from "next/link";
export default function Custom401({}) {
  return (
    <Box
      sx={{
        height: {
          md: "100vh",
        },
        width: {
          md: "100vw",
        },
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={1}
        sx={{
          width: {
            md: "40%",
          },
          p: 2,
        }}
      >
        <ErrorOutlineOutlined
          sx={{
            typography: "h4",
          }}
        />
        <Typography variant="h3">Uh oh</Typography>
        <Typography sx={{ mb: 2 }}>
          Sorry, you are not authorized to view the resource(s). Your attempt of
          viewing the resource may be logged for security purposes.
        </Typography>
        <Box textAlign="right">
          <Button variant="contained" size="large" component={Link} href="/">
            Take me home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
