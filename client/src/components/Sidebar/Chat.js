import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { setMessagesAsRead } from "../../store/conversations";
import socket from "../../socket";

const styles = {
  unreadBubble: {
    width: "28px",
    height: "15px",
    fontSize: "12px",
    color: "white",
    fontWeight: 900,
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

class Chat extends Component {
  handleClick = async (conversation) => {
    conversation.messages = conversation.messages || [];

    await this.props.setMessagesAsRead(conversation.id);

    await this.props.setActiveChat(conversation.otherUser.username);

    if (conversation.messages.length > 0) {
      socket.emit("read-message", conversation.messages[0]);
    }
  };

  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;
    const { messages } = this.props.conversation;

    let unreads = messages.reduce((acc, message) => {
      return message.senderId === otherUser.id && !message.isRead
        ? acc + 1
        : acc + 0;
    }, 0);

    const { typingUsers } = this.props.otherUsers;

    let isTyping = false;

    if (otherUser.id in typingUsers) {
      isTyping = typingUsers[otherUser.id];
    }

    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent
          conversation={this.props.conversation}
          isTyping={isTyping}
        />
        {unreads !== 0 && <Box className={classes.unreadBubble}>{unreads}</Box>}
      </Box>
    );
  }
}

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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Chat));
