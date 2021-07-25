import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Header, Input, Messages } from "./index";

const useStyles = makeStyles(({ xsBreakPoint }) => ({
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

export const ActiveChat = () => {
  const classes = useStyles();
  const { user, otherUsers, conversations, activeConversation } = useSelector(
    (state) => state
  );

  const [conversation, setConversation] = useState({
    id: 0,
    otherUser: {},
    messages: [],
  });

  useEffect(() => {
    const foundConversation = conversations.find((c) => {
      return c.otherUser.username === activeConversation;
    });
    if (foundConversation) {
      setConversation(foundConversation);
    }
  }, [activeConversation]);

  const otherUser = conversation.otherUser;

  let isTyping = false;

  const { typingUsers } = otherUsers;

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
              isTyping={isTyping}
            />
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
