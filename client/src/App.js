import React from "react";
import "./App.css"
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Login from "./pages/LoginPage/LoginPage";
import Admin from "./layouts/Admin/Admin";
import ProtectedRoute from "./auth/protected-route";
import AuthCallbackPage from "./pages/AuthCallbackPage/AuthCallbackPage";
import FacilityManager from "./layouts/FacilityManager/FacilityManager";

const App = () => {

  return (
    <Switch>
      <ProtectedRoute path="/admin" component={Admin} />
      <ProtectedRoute path="/facilityManager" component={FacilityManager}/>
      <ProtectedRoute path="/callback" component={AuthCallbackPage} />
      <Route exact path="/" component={Login} />
    </Switch>
  );
};

export default App;
