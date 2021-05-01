import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Dashboard } from "../pages";

export const PrivateRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />

      <Route exact path="*" component={() => <Redirect to="/dashboard" />} />
    </Switch>
  );
};
