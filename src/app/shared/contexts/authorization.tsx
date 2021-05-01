import React, { createContext, useCallback, useEffect, useState } from "react";

interface IAuthorizationContextData {
  isAuth: boolean;
}
export const AuthorizationContext = createContext<IAuthorizationContextData>(
  {} as IAuthorizationContextData
);

export const AuthorizationProvider: React.FC = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <AuthorizationContext.Provider value={{ isAuth }}>
      {children}
    </AuthorizationContext.Provider>
  );
};
