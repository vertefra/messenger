import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import { Chat, CurrentUser, Search } from "./index.js";

export const useStyles = makeStyles((theme) => {
  return {
    root: {
      paddingLeft: 21,
      paddingRight: 21,
      flexGrow: 1,
    },
    title: {
      fontSize: 20,
      letterSpacing: -0.29,
      fontWeight: "bold",
      marginTop: 32,
      marginBottom: 15,
    },
  };
});

export const Sidebar = (props) => {
  const classes = useStyles();
  const { conversations } = useSelector((state) => state) || [];
  const { handleChange, searchTerm } = props;

  return (
    <Box className={classes.root}>
      <CurrentUser />
      <Typography className={classes.title}>Chats</Typography>
      <Search handleChange={handleChange} />
      {conversations
        .filter((conversation) =>
          conversation.otherUser.username.includes(searchTerm)
        )
        .map((conversation) => {
          return (
            <Chat
              conversation={conversation}
              key={conversation.otherUser.username}
            />
          );
        })}
    </Box>
  );
};
