import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    const { recipientId, message, sender } = data
    const state = store.getState()
    const { activeConversation, conversations, user } = state
    const { id: userId } = user
    
    if(activeConversation){
      const conversation = conversations.find(c => c.otherUser.username === activeConversation)
      if(message.conversationId == conversation.id){
        message.isRead = true
      }      
    } else {
      message.isRead = false
    }

    if (userId === recipientId){
      store.dispatch(setNewMessage(message, sender));
    }
  });
});

export default socket;
