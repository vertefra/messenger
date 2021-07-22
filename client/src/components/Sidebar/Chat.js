import { Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import socket from "../../socket";
import { setActiveChat } from "../../store/activeConversation";
import { setMessagesAsRead } from "../../store/conversations";
import { BadgeAvatar, ChatContent } from "../Sidebar";

const styles = {
  unreadBubble: {
    width: "28px",
    height: "15px",
    fontSize: "12px",
    color: "white",
    fontWeight: 'bold',
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
    "&:hover": {
      cursor: "grab",
    },
  },
};

const Chat = (props) => {
  const handleClick = async (conversation) => {
    conversation.messages = conversation.messages || [];

    await props.setMessagesAsRead(conversation.id);

    await props.setActiveChat(conversation.otherUser.username);

    if (conversation.messages.length > 0) {
      socket.emit("read-message", conversation.messages[0]);
    }
  };

  const [unreads, setUnread] = useState(0)
  const { classes, activeConversation  } = props;
  const otherUser = props.conversation.otherUser;
  const { messages } = props.conversation;
  
  useEffect(() => {
    const unreadsFound = messages.reduce((acc, message) => {
      return message.senderId === otherUser.id && !message.isRead
        ? acc + 1
        : acc + 0;
    }, 0);
    setUnread(unreadsFound)
  }, [messages.length, activeConversation])


  const { typingUsers } = props.otherUsers;
  let isTyping = false;

  if (otherUser.id in typingUsers) {
    const typingUser = typingUsers[otherUser.id];
    isTyping = typingUser.isTyping;
  }

  return (
    <Box
      onClick={() => handleClick(props.conversation)}
      className={classes.root}
    >
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={props.conversation} isTyping={isTyping} />
      {unreads !== 0 && <Box className={classes.unreadBubble}>{unreads}</Box>}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    setMessagesAsRead: (conversationId) => {
      dispatch(setMessagesAsRead(conversationId));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    otherUsers: state.otherUsers,
    activeConversation: state.activeConversation
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Chat));
