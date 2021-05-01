import React, { createContext, useCallback, useEffect, useState } from "react";
import { SigninService } from "../services/signin-service/SigninService";

interface IAuthorizationContextData {
  isAuth: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
export const AuthorizationContext = createContext<IAuthorizationContextData>(
  {} as IAuthorizationContextData
);

export const AuthorizationProvider: React.FC = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await SigninService.signin(email, password);

    if (result.success) {
      setIsAuth(true);
      localStorage.setItem("accessToken", "token");
    } else {
      setIsAuth(false);
      if (!result.messages || result.messages.length === 0) {
        alert("Erro no login!");
      } else {
        alert(result.messages.join(",\n"));
      }
    }
  }, []);

  const handleLogout = useCallback(async () => {
    setIsAuth(false);
  }, []);

  return (
    <AuthorizationContext.Provider
      value={{ isAuth, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};
