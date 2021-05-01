import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { DarkModeCheckbox } from "../../shared/components";

import { Button } from "../../shared/components/Button";
import { useTheme } from "../../shared/hooks/useTheme";
import { SigninService } from "../../shared/services/signin-service/SigninService";
import "./Signin.css";

export const Signin: React.FC = () => {
  const { isDark, toggleDarkMode } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepConnected, setKeepConnected] = useState(true);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const result = await SigninService.signin(email, password);

      if (result.success) {
        history.push("/dashboard");
      } else {
        if (!result.messages || result.messages.length === 0) {
          alert("Erro no login!");
        } else {
          alert(result.messages.join(",\n"));
        }
      }
    },
    [email, password, history]
  );

  return (
    <div className="signin-base flex-content-center flex-items-center">
      <div className="padding-g shadow-m border-radius-soft flex-column flex-items-center background-paper translate-in-y">
        <h2>Fazer login</h2>

        <div className="margin-top-m">
          <form className="login-form flex-column" onSubmit={handleSubmit}>
            <input
              required
              type="email"
              minLength={2}
              value={email}
              placeholder="Digite seu email"
              onChange={(e) => setEmail(e.target.value)}
              className="padding-m font-size-m"
            />

            <input
              required
              minLength={2}
              type="password"
              value={password}
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
              className="padding-m font-size-m margin-top-s"
            />

            <label className="font-size-m margin-top-s padding-top-s padding-bottom-s display-flex flex-items-center">
              <input
                type="checkbox"
                checked={keepConnected}
                className="margin-right-s"
                placeholder="Digite sua senha"
                onChange={() => setKeepConnected(!keepConnected)}
              />
              Manter conectado
            </label>

            <Button>Entrar</Button>
          </form>
        </div>

        <Link to="/signup" className="font-size-m margin-top-m font-weight-g">
          Cadastrar-se
        </Link>
      </div>
      <DarkModeCheckbox />
      {/* <div className="dark-mode-container">
        <label className="font-size-m padding-g display-flex flex-items-center">
          <input
            type="checkbox"
            checked={isDark}
            className="margin-right-s"
            onChange={() => toggleDarkMode()}
          />
          Tema escuro
        </label>
      </div> */}
    </div>
  );
};
