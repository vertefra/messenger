import { FilledInput, FormControl, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

const useStyles = makeStyles(() => ({
  filledInput: {
    height: 50,
    background: "#E9EEF9",
    borderRadius: 5,
    fontSize: 13,
    fontWeight: "bold",
    color: "#99A9C4",
    letterSpacing: 0,
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    "&::placeholder": {
      color: "#ADC0DE",
      opacity: 1,
    },
  },
}));

export const Search = ({ handleChange }) => {
  const classes = useStyles();

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <form onSubmit={(evt) => handleSubmit(evt)}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          name="search"
          onChange={handleChange}
          classes={{ root: classes.filledInput, input: classes.input }}
          disableUnderline
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        ></FilledInput>
      </FormControl>
    </form>
  );
};
