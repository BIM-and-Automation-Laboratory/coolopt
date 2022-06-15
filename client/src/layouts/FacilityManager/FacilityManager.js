import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useAuth0 } from "@auth0/auth0-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import routes from "../../routes/layoutRoutes";
import styles from "../styles";
import logo from "../../assets/img/logo.png";
import { GET_ADMINS } from "../../utils/graphql";
import { useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import CircleSpinner from "../../components/CircleSpinner/CircleSpinner";

export default function FacilityManager({ ...rest }) {
  const useStyles = makeStyles(styles);

  const classes = useStyles();

  const { user } = useAuth0();

  const { email, sub } = user;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Return admins data if present
  const { loading: getAdminsLoading, data: adminsData } = useQuery(GET_ADMINS);

  if (getAdminsLoading) return <CircleSpinner />;

  // boolean check if user already has a admin profile.
  const hasProfile = () =>
    adminsData && adminsData.Admin.some((admin) => admin.email === email);

  // get the currently logged in admin
  const admin =
    (adminsData && adminsData.Admin.find((admin) => admin.userId === sub)) ||
    [];

  const switchRoutes = (
    <Switch>
      {routes.map((prop) =>
        // if user has no profile, create only one route to get-started
        !hasProfile()
          ? prop.path === "/getting-started" && (
              <Route
                path={prop.layout.admin + prop.path}
                component={prop.component}
                key={uuidv4()}
              />
            )
          : // if user has a profile, create all sidebar routes except get-started
            prop.path !== "/getting-started" && (
              <Route
                exact={prop.exact}
                path={prop.layout.admin + `/${admin.adminId}` + prop.path}
                component={prop.component}
                key={uuidv4()}
              />
            )
      )}

      {!hasProfile() ? (
        // if user has no profile, always redirect to getting-started
        <Redirect from="/facilityManager" to="/facilityManager/getting-started" />
      ) : (
        // if user has profile, do normal redirect
        <Redirect from="/facilityManager" to={`/facilityManager/${admin.adminId}/dashboard`} />
      )}
    </Switch>
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <Sidebar
        routes={routes}
        logo={logo}
        handleDrawerToggle={handleDrawerToggle}
        open={drawerOpen}
        mobileOpen={mobileOpen}
        color="blue"
        {...rest}
      />
      <Navbar
        open={drawerOpen}
        handleDrawerToggle={handleDrawerToggle}
        handleDrawerClose={handleDrawerClose}
      />
      <div
        className={clsx(classes.mainPanel, {
          [classes.mainPanelShift]: drawerOpen,
        })}
      >
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>
      </div>
    </div>
  );
}
