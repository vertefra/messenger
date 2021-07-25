import { Avatar, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import React from "react";

const useStyles = makeStyles(({ bubble, palette }) => ({
  root: {
    display: "flex",
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6,
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  dots: {
    fontSize: 10,
    fontWeight: "bold",
    color: palette.text.lightGrey,
    letterSpacing: 0.5,
    padding: 8,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  bubble,
}));

const dotStyle = {
  width: "10px",
  margin: "0 6px",
};

const OtherUserTypingBubble = (props) => {
  const classes = useStyles();
  const { otherUser } = props;
  return (
    <Box className={classes.root}>
      <Avatar
        alt={otherUser.username}
        src={otherUser.photoUrl}
        className={classes.avatar}
      ></Avatar>
      <Box>
        <Typography className={classes.usernameDate}>
          {otherUser.username}
        </Typography>
        <Box className={classes.bubble}>
          <Typography className={classes.dots}>
            <FiberManualRecordIcon style={dotStyle} />
            <FiberManualRecordIcon style={dotStyle} />
            <FiberManualRecordIcon style={dotStyle} />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OtherUserTypingBubble;
