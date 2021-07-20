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
    console.log("A message has been received ==> ", data)
    const userIdJSON = localStorage.getItem('user_id')
    const userId = Number(JSON.parse(userIdJSON))
    const { recipientId, message, sender } = data
    if (userId === recipientId){
      console.log("This is for me")
      store.dispatch(setNewMessage(message, sender));
    } else {
      console.log("this is not for me!")
    }
  });
});

export default socket;
