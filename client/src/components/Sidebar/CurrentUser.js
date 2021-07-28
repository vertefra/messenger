import { Box, Menu, MenuItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/utils/thunkCreators";
import { BadgeAvatar } from "./index";

const useStyles = makeStyles(({ menuItem }) => ({
  root: {
    height: 44,
    marginTop: 23,
    marginLeft: 6,
    display: "flex",
    alignItems: "center",
  },
  subContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
  },
  username: {
    letterSpacing: -0.23,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 17,
  },
  ellipsis: {
    color: "#95A7C4",
    marginRight: 24,
    opacity: 0.5,
    cursor: "pointer",
  },
  menuItem,
}));

export const CurrentUser = () => {
  const classes = useStyles();
  const { user } = useSelector((state) => state) || {};
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (ev) => {
    if ((ev.currentTarget.id = "logout-item")) {
      dispatch(logout(user.id));
    }
    setAnchorEl(null);
  };

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={classes.root}>
      <BadgeAvatar photoUrl={user.photoUrl} online={true} />
      <Box className={classes.subContainer}>
        <Typography className={classes.username}>{user.username}</Typography>
        <MoreHorizIcon
          classes={{ root: classes.ellipsis }}
          onClick={(evt) => handleClick(evt)}
        />
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={(evt) => handleMenuClick(evt)}
            id="logout-item"
            className={classes.menuItem}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};
