import React, { useCallback, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../shared/components/Button';
import { useTheme } from '../../shared/hooks/useTheme';
import './Signup.css';
import '../../styles/animations.css';

export const Signup: React.FC = () => {

    const RepeatedPasswordRef = useRef<HTMLInputElement>(null)

    const { isDark, toggleDarkMode } = useTheme();

    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [RepeatedPassword, setRepeatedPassword] = useState('');
    const [keepConnected, setKeepConnected] = useState(true);

    const handleOnChangePassword = useCallback((value: string) => {
        setPassword(value)

        if(value !== RepeatedPassword) {
            if(RepeatedPasswordRef.current){
                RepeatedPasswordRef.current.setCustomValidity('As senhas são diferentes!')
                // RepeatedPasswordRef.current.classList.toggle('translate-in-y') 
            }
        }else{
            if(RepeatedPasswordRef.current){
                RepeatedPasswordRef.current.setCustomValidity('')
            }
        }        
    },[RepeatedPassword])

    const handleOnChangeRepeatedPassword = useCallback((value: string) => {
        setRepeatedPassword(value)

        if(password !== value) {
            if(RepeatedPasswordRef.current){
                RepeatedPasswordRef.current.setCustomValidity('As senhas são diferentes!')
            }
        }else{
            if(RepeatedPasswordRef.current){
                RepeatedPasswordRef.current.setCustomValidity('')
            }
        }
    },[password])

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(email, password);
    }, [email, password, RepeatedPassword]);

    return (
        <div className="signup-base flex-content-center flex-items-center">
            <div className="padding-g shadow-m border-radius-soft flex-column flex-items-center background-paper">
                <h2>Cadastrar</h2>

                <div className="margin-top-m">
                    <form className="login-form flex-column" onSubmit={handleSubmit}>

                        <input
                            required
                            type="text"
                            minLength={2}
                            value={name}
                            placeholder="Digite seu nome"
                            onChange={(e) => setName(e.target.value)}
                            className="padding-m font-size-m"
                        />

                        <input
                            type="text"
                            minLength={2}
                            maxLength={80}
                            value={userName}
                            placeholder="Digite seu nome de usuário"
                            onChange={(e) => setUserName(e.target.value)}
                            className="padding-m font-size-m margin-top-s"
                        />

                        <input
                            required
                            type="email"
                            minLength={2}
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
                            placeholder="Digite sua senha"
                            onChange={(e) => handleOnChangePassword(e.target.value)}
                            className="padding-m font-size-m margin-top-s"
                        />

                        <input
                            required
                            minLength={2}
                            type="password"
                            value={RepeatedPassword}
                            ref={RepeatedPasswordRef}
                            placeholder="Confirme sua senha"
                            onChange={(e) => handleOnChangeRepeatedPassword(e.target.value)}
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

                        <Button>Cadastrar</Button>
                    </form>

                </div>

                <Link to="/signin" className="font-size-m margin-top-m font-weight-g">
                    Logar
                </Link>
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
}
