import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#b3e5fc",
      dark: "#0277bd",
      light: "#e1f5fe",
    },
    secondary: {
      main: "#212c6f",
      dark: "#448aff",
      light: "#69a1ff",
    },
    white: {
      main: "#ffffff",
    },
    black: {
      main: "#000000",
    },
    complentary: {
      main: "#c51162",
      light: "#f8bbd0",
      dark: "#880e4f",
    },
    gray: {
      main: "#ccc",
    },
  },
  typography: {
    fontFamily: "Sans-Serif",
  },
  spacing: 8,
});

export default theme;
