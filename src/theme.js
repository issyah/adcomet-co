import { Roboto, Roboto_Slab } from "next/font/google";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const robotoSlab = Roboto_Slab({
  weight: ["500", "700", "900"],
  subsets: ['latin'],
  display: 'swap',
  fallback: ["Helvetica", "Arial", "sans-serif"],
})

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#3a36db",
      color4: '#211D42',
    },
    secondary: {
      main: "#0090ff",
    },
    error: {
      main: "#ea3a3d",
    },
    success: {
      main: "#1ad598",
    },
    warning: {
      main: "#f9b959",
    },
    default: {
      main: "#FFF",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    button: {
      textTransform: "none",
    },
    h1: {
      fontFamily: robotoSlab.style.fontFamily
    }, h2: {
      fontFamily: robotoSlab.style.fontFamily
    },
    h3: {
      fontFamily: robotoSlab.style.fontFamily
    },
    h4: {
      fontFamily: robotoSlab.style.fontFamily
    },
    h5: {
      fontFamily: robotoSlab.style.fontFamily
    },
    h6: {
      fontFamily: robotoSlab.style.fontFamily
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          "&.MuiPaper-elevation1": {
            boxShadow:
              "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
          },
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
