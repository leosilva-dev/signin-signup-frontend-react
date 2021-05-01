import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { Signin } from "../pages/signin/Signin";
import { Signup } from "../pages/signup/Signup";

export const PublicRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signup" component={Signup} />

      <Route exact path="*" component={() => <Redirect to="/signin" />} />
    </Switch>
  );
};
