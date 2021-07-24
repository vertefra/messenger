import { createTheme } from "@material-ui/core";

const xsBreakPoint = 600
const xsBreakPointH = 700
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
        textAlign: "center"
      },
      [`@media (max-height:${xsBreakPointH}px)`]: {
        fontSize: 22
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
    }
  },
  loginBox: {
    position: "relative",
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  paperButton: {
    margin: 25,
    width: "35%",
    height: "4rem",
    [`@media (max-width:${xsBreakPoint}px)`]: {
      margin: 15
    },
    [`@media (max-height:${xsBreakPointH}px)`]: {
      margin: 5,
      width: "25%",
      height: "2.5rem"
    },
    
  },
  loginButton: {
    color: "#3A8DFF",
    width: "100%",
    height: "100%"
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
  credentialsForm: {
    display: "flex",
    justifyContent: "center",
    [`@media (max-width:${xsBreakPoint}px)`]: {
      marginTop:  30
    },
    [`@media (max-height:${xsBreakPointH}px)`]: {
      fontSize: 12,
      marginTop: "4.8rem",
      padding: "0.5rem 1.8rem",
    },
  },
  submitButton: {
    color: "#FFFFFF",
    backgroundColor: "#3A8DFF",
    borderRadius: "2px",
    padding: "1rem 3.8rem",
    margin: 28,
    [`@media (max-height:${xsBreakPointH}px)`]: {
      fontSize: 12,
      marginTop: "15px",
      padding: "0.5rem 1.8rem",
    },
  },
  formControll: {
    width: "100%",
    // check this
    [`@media (max-height:${xsBreakPointH}px)`]: {
      fontSize: 12,
      margin: 0,
    },
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
      red: "red"
    }
  },
  menuItem: {
    minWidth: 200
  },
  bubble: {
    borderRadius: "0 10px 10px 10px",
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
  },
});
