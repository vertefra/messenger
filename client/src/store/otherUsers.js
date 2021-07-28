const defaultOtherUsersState = {
  typingUsers: {},
};

const SET_USER_TYPING_STATE = "SET_USER_TYPING_STATE";

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
