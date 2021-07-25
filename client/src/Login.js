import {
  Button,
  FormControl,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "./store/utils/thunkCreators";

const useStyles = makeStyles(
  ({
    formControll,
    navbar,
    submitButton,
    loginButton,
    loginBox,
    credentialsForm,
    paperButton,
  }) => ({
    navbar,
    loginBox,
    credentialsForm,
    paperButton,
    loginButton,
    submitButton,
    formControll,
  })
);

const Login = (props) => {
  const { user, login } = props;

  const classes = useStyles();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container alignItems="flex-start">
      <Grid container className={classes.loginBox} direction="column">
        <Grid className={classes.navbar}>
          <Typography>Don't have an account?</Typography>
          <Paper className={classes.paperButton}>
            <Button
              className={classes.loginButton}
              onClick={() => props.setPage("signup")}
            >
              Signup
            </Button>
          </Paper>
        </Grid>
        <Grid>
          <form onSubmit={handleLogin} className={classes.credentialsForm}>
            <Grid xs={10} sm={8}>
              <Typography variant="h1">Welcome back!</Typography>
              <Grid>
                <FormControl
                  margin="normal"
                  required
                  className={classes.formControll}
                >
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                  />
                </FormControl>
              </Grid>
              <Grid>
                <FormControl
                  margin="normal"
                  required
                  className={classes.formControll}
                >
                  <TextField
                    label="password"
                    aria-label="password"
                    type="password"
                    name="password"
                  />
                </FormControl>
              </Grid>
              <Grid container justifyContent="center">
                <Button
                  className={classes.submitButton}
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
