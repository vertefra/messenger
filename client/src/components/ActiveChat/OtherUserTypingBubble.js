import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar, Badge } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const useStyles = makeStyles(() => ({
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
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px",
  },
  dots: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    padding: 8,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
}));

const dotStyle = {
  width: "20px",
  margin: "4px",
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
