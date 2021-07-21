const defaultOtherUsersState = {
  typingUsers: {},
};

const SET_USER_TYPING_STATE = "SET_USER_TYPING_STATE";

// Reducing function
const setUserTypingState = (
  state = defaultOtherUsersState,
  payload = { userId: 0, isTyping: false }
) => {
  const otherUsersState = { ...state };
  const { typingUsers } = otherUsersState;
  const { userId, isTyping } = payload;
  typingUsers[userId] = isTyping;
  return otherUsersState;
};

export const setUserIsTyping = (userId = 0, isTyping = false) => {
  return {
    type: SET_USER_TYPING_STATE,
    payload: { userId, isTyping },
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
