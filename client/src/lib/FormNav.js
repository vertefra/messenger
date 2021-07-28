import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { xsBreakPoint, xsBreakPointH } from "./../themes/theme";

const paperButtonStyle = {
  margin: 25,
  width: "35%",
  height: "4rem",
  [`@media (maxWidth:${xsBreakPoint}px)`]: {
    margin: 15,
  },
  [`@media (maxHeight:${xsBreakPointH}px)`]: {
    margin: 5,
    width: "25%",
    height: "2.5rem",
  },
};

const loginButtonStyle = {
  color: "#3A8DFF",
  width: "100%",
  height: "100%",
};

export const FormNav = ({ handleOnClick, buttonValue, className, title }) => {
  return (
    <Grid className={className}>
      <Typography>{title}</Typography>
      <Paper style={paperButtonStyle}>
        <Button onClick={handleOnClick} style={loginButtonStyle}>
          {buttonValue}
        </Button>
      </Paper>
    </Grid>
  );
};
