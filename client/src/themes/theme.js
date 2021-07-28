import { createTheme } from "@material-ui/core";

export const xsBreakPoint = 600;
export const xsBreakPointH = 700;

export const theme = createTheme({
  xsBreakPoint,
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold",
    },
    h1: {
      textAlign: "left",
      fontSize: 36,
      fontWeight: "700",
      padding: 0,
      margin: 0,
      [`@media (max-width:${xsBreakPoint}px)`]: {
        fontSize: 24,
        textAlign: "center",
      },
      [`@media (max-height:${xsBreakPointH}px)`]: {
        fontSize: 22,
      },
    },
    hero: {
      fontSize: 24,
      fontWeight: 600,
      color: "#FFFFFF",
      margin: 60,
      [`@media (max-height:${xsBreakPointH}px)`]: {
        fontSize: 20,
      },
    },
  },
  loginBox: {
    position: "relative",
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  navbar: {
    width: "100%",
    position: "absolute",
    top: 0,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    color: "#9e9e9e",
  },

  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold",
      },
    },
  },
  palette: {
    primary: { main: "#3A8DFF", dark: "#2c6fc5" },
    secondary: { main: "#86B9FF" },
    text: {
      secondary: "#BECCE2",
      lightGrey: "#FFFFFF",
      red: "red",
    },
  },
  menuItem: {
    minWidth: 200,
  },
  bubble: {
    borderRadius: "0 10px 10px 10px",
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
  },
});
