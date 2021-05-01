import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";

import { PublicRoutes } from "./PublicRoutes";

export const Routes: React.FC = () => {
  const isAuth = false;

  return (
    <BrowserRouter>
      {isAuth ? <PrivateRoutes /> : <PublicRoutes />}
    </BrowserRouter>
  );
};
