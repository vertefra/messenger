const defaultOtherUsersState = {
  typingUsers: {},
};

const SET_USER_TYPING_STATE = "SET_USER_TYPING_STATE";

// otherUsersState can hold multiple objects
// to describe events happening on other users 
// connected with us. The only object implemented
// up to now is typingUsers, an object that uses
// userId as a key a boolean isTyping, and the name
// of the conversation that he is typing in.

// Reducing function
const setUserTypingState = (
  state = defaultOtherUsersState,
  payload = { userId: 0, currentConversation: undefined, isTyping: false }
) => {
  const otherUsersState = { ...state };
  let { typingUsers } = otherUsersState;
  const { userId, currentConversation, isTyping } = payload;
  typingUsers = { ...typingUsers, [userId]: { isTyping, currentConversation } };
  otherUsersState.typingUsers = typingUsers;
  return otherUsersState;
};

export const setUserIsTyping = (
  userId = 0,
  currentConversation = undefined,
  isTyping = false
) => {
  return {
    type: SET_USER_TYPING_STATE,
    payload: { userId, currentConversation, isTyping },
  };
};

const reducer = (
  state = defaultOtherUsersState,
  action = { type: "", payload: "" }
) => {
  switch (action.type) {
    case SET_USER_TYPING_STATE:
      return setUserTypingState(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
