import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fe9934",
    },

    secondary: {
      main: "#7ed56f",
    },

    error: {
      main: red.A400,
    },

    background: {
      default: "white",
    },
  },
  typography: {
    fontFamily: ["Exo", "Arial", "sans-serif"].join(","),
  },
});

export default theme;
