import React, { useCallback, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { Button } from "../../shared/components/Button";
import { useTheme } from "../../shared/hooks/useTheme";
import "./Signup.css";
import "../../styles/animations.css";
import { SignupService } from "../../shared/services/signup-service/SignupService";

export const Signup: React.FC = () => {
  const RepeatedPasswordRef = useRef<HTMLInputElement>(null);

  const history = useHistory();

  const { isDark, toggleDarkMode } = useTheme();

  const [isLoadding, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [RepeatedPassword, setRepeatedPassword] = useState("");
  // const [keepConnected, setKeepConnected] = useState(true);

  const handleOnChangePassword = useCallback(
    (value: string) => {
      setPassword(value);

      if (value !== RepeatedPassword) {
        if (RepeatedPasswordRef.current) {
          RepeatedPasswordRef.current.setCustomValidity(
            "As senhas são diferentes!"
          );
          // RepeatedPasswordRef.current.classList.toggle('translate-in-y')
        }
      } else {
        if (RepeatedPasswordRef.current) {
          RepeatedPasswordRef.current.setCustomValidity("");
        }
      }
    },
    [RepeatedPassword]
  );

  const handleOnChangeRepeatedPassword = useCallback(
    (value: string) => {
      setRepeatedPassword(value);

      if (password !== value) {
        if (RepeatedPasswordRef.current) {
          RepeatedPasswordRef.current.setCustomValidity(
            "As senhas são diferentes!"
          );
        }
      } else {
        if (RepeatedPasswordRef.current) {
          RepeatedPasswordRef.current.setCustomValidity("");
        }
      }
    },
    [password]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setIsLoading(true);

      const result = await SignupService.signup({
        name,
        email,
        password,
        username,
      });

      setIsLoading(false);

      if (result.success) {
        history.push("/signin");
      } else {
        if (!result.messages || result.messages.length === 0) {
          alert("Erro no cadastro!");
        } else {
          alert(result.messages.join(",\n"));
        }
      }
    },
    [name, username, email, password, history]
  );

  return (
    <div className="signup-base flex-content-center flex-items-center">
      <div className="padding-g shadow-m border-radius-soft flex-column flex-items-center background-paper translate-in-y">
        <h2>Cadastrar</h2>

        <div className="margin-top-m">
          <form className="login-form flex-column" onSubmit={handleSubmit}>
            <input
              required
              type="text"
              minLength={2}
              disabled={isLoadding}
              value={name}
              placeholder="Digite seu nome"
              onChange={(e) => setName(e.target.value)}
              className="padding-m font-size-m"
            />

            <input
              type="text"
              minLength={2}
              maxLength={80}
              disabled={isLoadding}
              value={username}
              placeholder="Digite seu nome de usuário"
              onChange={(e) => setUserName(e.target.value)}
              className="padding-m font-size-m margin-top-s"
            />

            <input
              required
              type="email"
              minLength={2}
              disabled={isLoadding}
              value={email}
              placeholder="Digite seu email"
              onChange={(e) => setEmail(e.target.value)}
              className="padding-m font-size-m margin-top-s"
            />

            <input
              required
              minLength={2}
              type="password"
              value={password}
              disabled={isLoadding}
              placeholder="Digite sua senha"
              onChange={(e) => handleOnChangePassword(e.target.value)}
              className="padding-m font-size-m margin-top-s"
            />

            <input
              required
              minLength={2}
              type="password"
              disabled={isLoadding}
              value={RepeatedPassword}
              ref={RepeatedPasswordRef}
              placeholder="Confirme sua senha"
              onChange={(e) => handleOnChangeRepeatedPassword(e.target.value)}
              className="padding-m font-size-m margin-top-s"
            />

            {/* <label className="font-size-m margin-top-s padding-top-s padding-bottom-s display-flex flex-items-center">
                            <input
                                type="checkbox"
                                checked={keepConnected}
                                className="margin-right-s"
                                placeholder="Digite sua senha"
                                onChange={() => setKeepConnected(!keepConnected)}
                            />
                            Manter conectado
                        </label> */}

            <Button disabled={isLoadding}>
              {!isLoadding ? "Cadastrar" : "Loading..."}
            </Button>
          </form>
        </div>

        {!isLoadding ? (
          <Link to="/signin" className="font-size-m margin-top-m font-weight-g">
            Logar
          </Link>
        ) : (
          <p className="font-size-m margin-top-m font-weight-g text-success ">
            Logar
          </p>
        )}
      </div>

      <div className="dark-mode-container">
        <label className="font-size-m padding-g display-flex flex-items-center">
          <input
            type="checkbox"
            checked={isDark}
            className="margin-right-s"
            onChange={() => toggleDarkMode()}
          />
          Tema escuro
        </label>
      </div>
    </div>
  );
};
