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
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("accessToken"));

  const handleLogin = useCallback(async (email: string, password: string) => {
    const { success, messages, data } = await SigninService.signin(
      email,
      password
    );

    if (success && data?.accessToken) {
      setIsAuth(true);
      localStorage.setItem("accessToken", data.accessToken);
    } else {
      setIsAuth(false);
      localStorage.removeItem("accessToken");
      if (!messages || messages.length === 0) {
        alert("Erro no login!");
      } else {
        alert(messages.join(",\n"));
      }
    }
  }, []);

  const handleLogout = useCallback(async () => {
    setIsAuth(false);
    localStorage.removeItem("accessToken");
  }, []);

  return (
    <AuthorizationContext.Provider
      value={{ isAuth, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};
