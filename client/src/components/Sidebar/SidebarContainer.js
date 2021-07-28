import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearSearchedUsers } from "../../store/conversations";
import { searchUsers } from "../../store/utils/thunkCreators";
import { Sidebar } from "./index";

export const SidebarContainer = (props) => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = async (evt) => {
    if (evt.target.value === "") {
      // clear searched convos from redux store
      dispatch(clearSearchedUsers());
      setSearchTerm("");
      return;
    }
    if (searchTerm.includes(evt.target.value)) {
      // if new value is included in search term, we don't need to make another API call, just need to set the search term value so the conversations can be filtered in the rendering
      dispatch(setSearchTerm(evt.target.value));
      return;
    }
    await dispatch(searchUsers(evt.target.value));
    setSearchTerm(evt.target.value);
  };

  return <Sidebar handleChange={handleChange} searchTerm={searchTerm} />;
};
