import { Box, makeStyles } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { OtherUserBubble, SenderBubble } from "../ActiveChat";

const useStyles = makeStyles(()=>({
  messages:{
    height: "78vh",
    overflowY: "scroll",
    marginBottom: 95
  }
}))


const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const classes = useStyles()

  const msgRef = useRef()
  // scroll down to the last message
  
  useEffect(()=>{
    if (msgRef.current) {
      msgRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages.length])

  return (
    <Box className={classes.messages}>
      {messages.map((message, idx) => {
        const time = moment(message.createdAt).format("h:mm");
        // Checks if we are at the last message
        const lastMessage = idx === messages.length - 1;
        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            isRead={message.isRead}
            lastMessage={lastMessage}
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
      <div ref={msgRef}></div>
    </Box>
  );
};

export default Messages;
