import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import MenuOpenIcon from "@material-ui/icons/MenuOpen";

import styles from "./navbarStyle";
import { CgMenuGridO } from "react-icons/cg";
import logo from "../../assets/img/CoolOptLogo.svg";
import ChooseModels from "../ChooseModels/ChooseModels";

const useStyles = makeStyles(styles);

export default function Navbar(props) {
  const classes = useStyles();

  var brand = (
    <a
      href="https://github.com/teenkevo/"
      className={classNames(classes.logoLink)}
      target="_blank"
    >
      <img src={logo} alt="logo" className={classes.logoImg} />
    </a>
  );

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.container}>
        <Hidden smDown implementation="css">
          <IconButton
            style={{
              width: "40px",
              height: "40px",
              color: "white",
              marginRight: "10px",
            }}
            onClick={props.handleDrawerClose}
          >
            <CgMenuGridO />
          </IconButton>
        </Hidden>
        <div className={classes.flex}>{brand}</div>
        <div style={{ width: "200px", marginTop: "10px" }}>
          <ChooseModels />
        </div>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <MenuOpenIcon />
          </IconButton>
        </Hidden>
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
