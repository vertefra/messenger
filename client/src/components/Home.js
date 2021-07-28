import { CssBaseline, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchConversations } from "../store/utils/thunkCreators";
import { xsBreakPoint } from "../themes/theme";
import { ActiveChat } from "./ActiveChat";
import { SidebarContainer } from "./Sidebar";

const useStyles = makeStyles(({ root }) => ({
  root: {
    minHeight: "100vh",
    overflowY: "hidden",
    [`@media (max-width:${xsBreakPoint}px)`]: {
      overflowY: "auto",
    },
  },
}));

export const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const classes = useStyles();

  const [isLoggedIn, setIsLoggedIn] = useState(user.isLoggedIn || false);

  useEffect(() => {
    setIsLoggedIn(true);
  }, [user.id]);

  useEffect(() => {
    dispatch(fetchConversations());
  });

  if (user && !user.id) {
    // If we were previously logged in, redirect to login instead of register
    if (isLoggedIn) return <Redirect to="/login" />;
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <SidebarContainer />
        <ActiveChat />
      </Grid>
    </>
  );
};
