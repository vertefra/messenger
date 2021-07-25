import io from "socket.io-client";
import store from "./store";
import {
  addOnlineUser,
  removeOfflineUser,
  setMessagesAsRead,
  setNewMessage,
} from "./store/conversations";
import { setUserIsTyping } from "./store/otherUsers";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("read-message", (message) => {
    const { id: userId } = store.getState().user;
    if (userId === message?.senderId) {
      store.dispatch(setMessagesAsRead(message));
    }
  });

  socket.on("typing", (data) => {
    const { userId, currentConversation } = data;
    const { username } = store.getState().user;
    if (currentConversation === username) {
      store.dispatch(setUserIsTyping(userId, currentConversation, true));
      setTimeout(() => {
        store.dispatch(setUserIsTyping(userId, undefined, false));
      }, 3000);
    }
  });

  socket.on("new-message", (data) => {
    const { recipientId, message, sender } = data;
    const state = store.getState();
    const { activeConversation, conversations, user } = state;
    const { id: userId } = user;

    if (activeConversation) {
      const conversation = conversations.find(
        (c) => c.otherUser.username === activeConversation
      );
      if (message.conversationId === conversation.id) {
        message.isRead = true;
        socket.emit("read-message", message);
      }
    } else {
      message.isRead = false;
    }

    if (userId === recipientId) {
      store.dispatch(setNewMessage(message, sender));
    }
  });
});

export default socket;
