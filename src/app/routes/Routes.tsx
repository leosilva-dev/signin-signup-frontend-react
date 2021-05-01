import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../shared/hooks";
import { PrivateRoutes } from "./PrivateRoutes";

import { PublicRoutes } from "./PublicRoutes";

export const Routes: React.FC = () => {
  const { isAuth } = useAuth();

  return (
    <BrowserRouter>
      {isAuth ? <PrivateRoutes /> : <PublicRoutes />}
    </BrowserRouter>
  );
};
