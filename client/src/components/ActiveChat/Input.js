import { FilledInput, FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../socket";
import { postMessage } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
    position: "absolute",
    left: 0,
    right: 10,
    bottom: 0,
  },
}));

export const Input = ({ conversationId, otherUser }) => {
  const { user, activeConversation } = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [text, setText] = useState("");

  const handleChange = (evt) => {
    socket.emit("typing", {
      userId: user.id,
      currentConversation: activeConversation,
    });
    setText(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const reqBody = {
      text: evt.target.text.value,
      recipientId: otherUser.id,
      conversationId: conversationId,
      sender: conversationId ? null : user,
    };

    await dispatch(postMessage(reqBody));

    setText("");
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          autoComplete=""
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
      </FormControl>
    </form>
  );
};
