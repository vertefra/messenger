import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useRef } from "react";
import { connect } from "react-redux";
import store from "../../store";
import { Header, Input, Messages } from "./index";
import OtherUserTypingBubble from "./OtherUserTypingBubble";

const useStyles = makeStyles(({xsBreakPoint}) => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column",
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    [`@media (max-width:${xsBreakPoint}px)`]: {
      marginLeft: 15,
      marginRight: 15,
    }, 
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
  },
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user } = props;
  const conversation = props.conversation || {};
  const otherUser = conversation.otherUser;
  
  let isTyping = false;

  const { typingUsers } = store.getState().otherUsers;
  if (conversation && otherUser) {
    if (otherUser.id in typingUsers) {
      const typingUser = typingUsers[otherUser.id];
      isTyping = typingUser.isTyping;
    }
  }

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
            {isTyping && (
              <OtherUserTypingBubble otherUser={conversation.otherUser} />
            )}
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    typingUsers: state.otherUsers.typingUsers,
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) =>
          conversation.otherUser.username === state.activeConversation
      ),
  };
};

export default connect(mapStateToProps, null)(ActiveChat);
