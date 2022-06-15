import React from "react";
import classNames from "classnames";
import clsx from "clsx";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

import { GET_ADMINS } from "../../utils/graphql";
import { useQuery } from "@apollo/client";

import { useAuth0 } from "@auth0/auth0-react";
import styles from "./sidebarStyle";
import ProfilePopper from "../ProfilePopper/ProfilePopper";
import Navatar from "../Avatar/Avatar";
import { Collapse, Divider,} from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();

  const { user } = useAuth0();

  const { email, sub, nickname } = user;

  const roles = user[process.env.REACT_APP_AUTH0_ROLES_NAMESPACE];

  const [subMenuOpen, setSubMenuOpen] = React.useState(false);

  const { loading: getAdminsLoading, data: adminsData } = useQuery(GET_ADMINS);

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { color, logo, image, routes } = props;

  const admin =
    (adminsData && adminsData.Admin.find((admin) => admin.userId === sub)) ||
    [];

  // PROFILE CHECKS
  const hasAdminProfile = () =>
    adminsData && adminsData.Admin.some((admin) => admin.email === email);

  // ROLE CHECKS
  const hasAdminRole = () =>
    roles && roles.some((role) => role === "Administrator");

  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var listItemClasses;
        listItemClasses = classNames({
          [" " + classes[color]]: activeRoute(
            hasAdminRole()
              ? prop.layout.admin + `/${admin.adminId}` + prop.path
              : "/"
          ),
        });
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(
            hasAdminRole()
              ? prop.layout.admin + `/${admin.adminId}` + prop.path
              : "/"
          ),
        });

        // TODO: fix this logic to work for someone who already has
        // an existing profile under another role
        if (hasAdminProfile()) {
          return (
            // show all sidebar-links except getting started because user has already created a profile.
            prop.path !== "/getting-started" && (
              <NavLink
                to={
                  hasAdminRole()
                    ? prop.layout.admin + `/${admin.adminId}` + prop.path
                    : "/"
                }
                className={classes.item}
                activeClassName="active"
                key={key}
              >
                <ListItem button className={classes.itemLink + listItemClasses}>
                  {typeof prop.icon === "string" ? (
                    <Icon
                      className={classNames(classes.itemIcon, whiteFontClasses)}
                    >
                      {prop.icon}
                    </Icon>
                  ) : (
                    <prop.icon
                      className={classNames(classes.itemIcon, whiteFontClasses)}
                    />
                  )}
                  <ListItemText
                    primary={prop.name}
                    className={classNames(classes.itemText, whiteFontClasses)}
                    disableTypography={true}
                  />
                </ListItem>
              </NavLink>
            )
          );
        } else {
          return (
            // show only the get started link on side-bar if user has not
            // created profile(role is being tracked already)
            prop.path === "/getting-started" && (
              <NavLink
                to={
                  hasAdminRole()
                    ? prop.layout.admin + `/${admin.adminId}` + prop.path
                    : "/"
                }
                className={classes.item}
                activeClassName="active"
                key={key}
              >
                <ListItem button className={classes.itemLink + listItemClasses}>
                  {typeof prop.icon === "string" ? (
                    <Icon
                      className={classNames(classes.itemIcon, whiteFontClasses)}
                    >
                      {prop.icon}
                    </Icon>
                  ) : (
                    <prop.icon
                      className={classNames(classes.itemIcon, whiteFontClasses)}
                    />
                  )}
                  <ListItemText
                    primary={prop.name}
                    className={classNames(classes.itemText, whiteFontClasses)}
                    disableTypography={true}
                  />
                </ListItem>
              </NavLink>
            )
          );
        }
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <div className={classes.logoImage}>
        <img src={logo} alt="logo" className={classes.img} />
      </div>
      <p className={classes.logoText}>CoolOpt</p>
    </div>
  );

  const handleClick = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const handleOpenSubMenu = () => {
    setSubMenuOpen(true);
  };

  const handleCloseSubMenu = () => {
    setSubMenuOpen(false);
  };

  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={props.mobileOpen}
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.sidebarWrapper}>
            {links}
            <Divider
              style={{
                background: "rgba(180, 180, 180, 0.3)",
                height: "1px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            />
            <ListItem
              style={{
                paddingLeft: "10px",
                marginTop: "20px",
                background: "black",
              }}
              button
              onClick={handleClick}
            >
              <div style={{ marginRight: "10px" }}>
                <Navatar />
              </div>
              <ListItemText
                primary={nickname}
                className={classes.itemText}
                disableTypography={true}
              />
              {subMenuOpen ? (
                <MdExpandLess color="white" />
              ) : (
                <MdExpandMore color="white" />
              )}
            </ListItem>
            <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
              <div style={{ float: "right" }}>
                <ProfilePopper handleClose={handleCloseSubMenu} />
              </div>
            </Collapse>
          </div>
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          onMouseLeave={handleCloseSubMenu}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: props.open,
              [classes.drawerClose]: !props.open,
            }),
          }}
        >
          <div style={{ minHeight: "60px" }}></div>
          <div className={classes.sidebarWrapper}>
            {links}
            <Divider
              style={{
                background: "rgba(180, 180, 180, 0.3)",
                height: "1px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            />
            <ListItem
              style={{
                paddingLeft: "10px",
                marginTop: "20px",
                background: "black",
              }}
              button
              onClick={handleClick}
            >
              <div style={{ marginRight: "10px" }}>
                <Navatar />
              </div>
              <ListItemText
                primary={nickname}
                className={classes.itemText}
                disableTypography={true}
              />
              {subMenuOpen ? (
                <MdExpandLess color="white" />
              ) : (
                <MdExpandMore color="white" />
              )}
            </ListItem>
            <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
              <div style={{ float: "right" }}>
                <ProfilePopper handleClose={handleCloseSubMenu} />
              </div>
            </Collapse>
          </div>
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
