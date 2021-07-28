import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { AccessPage } from "./components/AccessPage";
import { Form } from "./lib/Form";
import { FormNav } from "./lib/FormNav";
import { TextFormField } from "./lib/TextFormField";
import { login } from "./store/utils/thunkCreators";
const useStyles = makeStyles(({ navbar, loginBox }) => ({
  navbar,
  loginBox,
}));

const Login = (props) => {
  const { user, login, history } = props;

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
    <AccessPage>
      <Grid container alignItems="flex-start">
        <Grid container className={classes.loginBox} direction="column">
          <FormNav
            handleOnClick={() => history.push("/signup")}
            buttonValue="Signup"
            className={classes.navbar}
            title="Don't have an account yet?"
          />
          <Grid>
            <Form
              formTitle="Welcome Back!"
              handleSubmit={handleLogin}
              submitValue="Login"
              xs={10}
              sm={8}
            >
              <TextFormField
                required
                ariaLabel="username"
                label="Username"
                name="username"
                inputType="text"
              />
              <TextFormField
                required
                ariaLabel="password"
                name="password"
                label="Password"
                inputType="password"
              />
            </Form>
          </Grid>
        </Grid>
      </Grid>
    </AccessPage>
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
