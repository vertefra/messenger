import { Grid, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { AccessPage } from "./components/AccessPage";
import { Form } from "./lib/Form";
import { FormNav } from "./lib/FormNav";
import { TextFormField } from "./lib/TextFormField";
import { register } from "./store/utils/thunkCreators";

const useStyles = makeStyles(({ loginBox, navbar }) => ({
  loginBox,
  navbar,
}));

const Login = (props) => {
  const { user, register, history } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({
    error: false,
    message: "",
  });

  const classes = useStyles();

  const handleRegister = async (event) => {
    event.preventDefault();
    setFormErrorMessage({ error: false, message: "" });

    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({
        error: true,
        message: "Password are not equal",
      });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <AccessPage>
      <Grid container alignItems="flex-start">
        <Grid container className={classes.loginBox} direction="column">
          <FormNav
            handleOnClick={() => history.push("/login")}
            buttonValue="Login"
            className={classes.navbar}
            title="Already registered?"
          />
          <Grid>
            <Form
              formTitle="Create an account"
              xs={10}
              sm={8}
              handleSubmit={handleRegister}
              submitValue="Create"
            >
              <TextFormField
                required
                ariaLabel="username"
                label="Username"
                inputType="text"
                name="username"
              />
              <TextFormField
                required
                ariaLabel="e-mail address"
                label="Email address"
                inputType="email"
                name="email"
              />
              <TextFormField
                required
                ariaLabel="password"
                label="Password"
                inputType="password"
                error={formErrorMessage.error}
                helpMessage={formErrorMessage.message}
                minLength={6}
                name="password"
              />
              <TextFormField
                required
                ariaLabel="confirm-password"
                label="Confirm Password"
                inputType="password"
                minLength={6}
                name="confirmPassword"
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
