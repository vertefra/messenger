import { Box, makeStyles } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { OtherUserBubble, SenderBubble } from "../ActiveChat";
import { OtherUserTypingBubble } from "./OtherUserTypingBubble";

const useStyles = makeStyles(() => ({
  messages: {
    height: "78vh",
    overflowY: "scroll",
    marginBottom: 95,
  },
}));

export const Messages = (props) => {
  const { messages, otherUser, userId, isTyping } = props;
  const classes = useStyles();

  const msgRef = useRef();
  // scroll down to the last message

  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages.length]);

  return (
    <Box className={classes.messages}>
      {messages.map((message, idx) => {
        const time = moment(message.createdAt).format("h:mm");
        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            isRead={message.lastRead}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
      {isTyping && <OtherUserTypingBubble otherUser={otherUser} />}
      <div ref={msgRef}></div>
    </Box>
  );
};
