/**
 * Button loading that accepts loading as props*/
import { Button, CircularProgress } from "@mui/material";
const ButtonLoading = ({ children, loading, ...props }) => {
  return (
    <Button
      {...props}
      startIcon={loading && <CircularProgress size={16} color="inherit" />}
    >
      {children}
    </Button>
  );
};

export default ButtonLoading;
