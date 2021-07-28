import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../socket";
import { setActiveChat } from "../../store/activeConversation";
import { setMessagesAsRead } from "../../store/conversations";
import { BadgeAvatar, ChatContent } from "../Sidebar";

const useStyles = makeStyles(() => ({
  unreadBubble: {
    width: "28px",
    height: "15px",
    fontSize: "12px",
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#3A8DFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
}));

export const Chat = ({ conversation }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { otherUser, messages } = conversation;
  const { otherUsers } = useSelector((state) => state);
  const { typingUsers } = otherUsers;

  const handleClick = async (conversation) => {
    conversation.messages = conversation.messages || [];

    await dispatch(setActiveChat(conversation.otherUser.username));

    if (conversation.messages.length > 0) {
      const lastMessage =
        conversation.messages[conversation.messages.length - 1];
      await dispatch(setMessagesAsRead(lastMessage));
      socket.emit("read-message", lastMessage);
    }
  };

  const unreads = useMemo(() => {
    return messages.reduce(
      (acc, message) =>
        message.senderId === otherUser.id && !message.isRead
          ? acc + 1
          : acc + 0,
      0
    );
  }, [messages.length, otherUser.id]);

  let isTyping = false;

  if (otherUser.id in typingUsers) {
    const typingUser = typingUsers[otherUser.id];
    isTyping = typingUser.isTyping;
  }

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} isTyping={isTyping} />
      {unreads !== 0 && <Box className={classes.unreadBubble}>{unreads}</Box>}
    </Box>
  );
};
