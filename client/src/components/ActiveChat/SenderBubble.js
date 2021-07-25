import { Avatar, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginRight: 15,
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
  },
  readNotification: {
    width: "13px",
    height: "13px",
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, otherUser, isRead } = props;
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
      {isRead && (
        <Avatar
          alt="readTrue"
          src={otherUser.photoUrl}
          className={classes.readNotification}
        ></Avatar>
      )}
    </Box>
  );
};

export default SenderBubble;
