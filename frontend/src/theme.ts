import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#6573C3",
      main: "#3f51b5",
      dark: "#0f172a",
      contrastText: "#fff",
    },
    secondary: {
      main: "#040b1c",
    },
    background: {
      default: "#6573C3",
    },
  },
});

export default theme;
