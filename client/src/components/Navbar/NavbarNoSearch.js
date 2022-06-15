import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import SearchIcon from "@material-ui/icons/Search";
// core components
import ProfilePopper from "../ProfilePopper/ProfilePopper";

import styles from "./navbarStyle";
import * as date from "../../utils/helperDate";

const useStyles = makeStyles(styles);

export default function Navbar(props) {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} style={{ boxShadow: "none" }}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create the date */}
          <Typography className={classes.day}>
            {date.currentDay().toUpperCase()}
          </Typography>
          <Typography className={classes.date}>{date.currentDate()}</Typography>
        </div>
        <ProfilePopper />
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};
