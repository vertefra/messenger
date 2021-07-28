import { Button, Grid, Typography } from "@material-ui/core";
import { xsBreakPoint, xsBreakPointH } from "../themes/theme";

const credentialsFormStyle = {
  display: "flex",
  justifyContent: "center",
  [`@media (maxWidth:${xsBreakPoint}px)`]: {
    marginTop: 30,
  },
  [`@media (maxHeight:${xsBreakPointH}px)`]: {
    fontSize: 12,
    marginTop: "4.8rem",
    padding: "0.5rem 1.8rem",
  },
};

const submitButtonStyle = {
  color: "#FFFFFF",
  backgroundColor: "#3A8DFF",
  borderRadius: "2px",
  padding: "1rem 3.8rem",
  margin: 28,
  [`@media (maxHeight:${xsBreakPointH}px)`]: {
    fontSize: 12,
    marginTop: "15px",
    padding: "0.5rem 1.8rem",
  },
};

export const Form = ({
  children,
  formTitle,
  handleSubmit,
  submitValue,
  xs,
  sm,
}) => {
  return (
    <form onSubmit={handleSubmit} style={credentialsFormStyle}>
      <Grid item xs={xs} sm={sm}>
        <Typography variant="h1">{formTitle}</Typography>
        <Grid>
          {children}
          <Grid container justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              size="large"
              style={submitButtonStyle}
            >
              {submitValue}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
