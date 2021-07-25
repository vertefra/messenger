import { CssBaseline, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { clearOnLogout } from "../store/index";
import { fetchConversations, logout } from "../store/utils/thunkCreators";
import { ActiveChat } from "./ActiveChat";
import { SidebarContainer } from "./Sidebar";

const xsBreakPoint = 600;

const styles = {
  root: {
    minHeight: "100vh",
    overflowY: "hidden",
    [`@media (max-width:${xsBreakPoint}px)`]: {
      overflowY: "auto",
    },
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.id !== prevProps.user.id) {
      this.setState({
        isLoggedIn: true,
      });
    }
  }

  componentDidMount() {
    this.props.fetchConversations();
  }

  handleLogout = async () => {
    await this.props.logout(this.props.user.id);
  };

  render() {
    const { classes } = this.props;
    if (!this.props.user.id) {
      // If we were previously logged in, redirect to login instead of register
      if (this.state.isLoggedIn) return <Redirect to="/login" />;
      return <Redirect to="/login" />;
    }
    return (
      <>
        {/* logout button will eventually be in a dropdown next to username */}
        {/* <Button className={classes.logout} onClick={this.handleLogout}>
          Logout
        </Button> */}
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <SidebarContainer />
          <ActiveChat />
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (id) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    },
    fetchConversations: () => {
      dispatch(fetchConversations());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
