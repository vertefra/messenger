import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";


const useStyles = makeStyles(({ formControll, navbar, submitButton, loginButton, loginBox, credentialsForm, paperButton }) =>({
  navbar,
  loginBox,
  loginButton,
  credentialsForm,
  formControll,
  submitButton,
  paperButton
})) 

const Login = (props) => {
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  
  const classes = useStyles();

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid
      container
      alignItems="flex-start"
    >
      <Grid container className={classes.loginBox} direction="column">
        <Grid container item className={classes.navbar}>
          <Typography>Need to log in?</Typography>
          <Paper className={classes.paperButton} >
            <Button className={classes.loginButton} onClick={() => props.setPage("login")}>
                Login
            </Button>
          </Paper>
        </Grid>
        <Grid>
         <form onSubmit={handleRegister} className={classes.credentialsForm}>
          <Grid xs={10} sm={8}>
            <Typography variant="h1">
              Create an account
            </Typography>
            <Grid>
              <FormControl margin="normal" className={classes.formControll}>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl margin="normal" className={classes.formControll}>
                <TextField
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl margin="normal" error={!!formErrorMessage.confirmPassword} className={classes.formControll}>
                <TextField
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl margin="normal" error={!!formErrorMessage.confirmPassword} className={classes.formControll}>
                <TextField
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid >
            <Grid container justifyContent="center">
            <Button className={classes.submitButton} type="submit" variant="contained" size="large">
              Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
