import React, { useState } from 'react';
import axios from 'axios';
import './Reg.css';

export default function Reg() {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/registration', {
        email,
        login,
        password,
      });

      console.log('Данные успешно отправлены на сервер');
      console.log('Токен:', response.data.token);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <form className="reg-form" onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        placeholder="Login"
        type="text"
        value={login}
        onChange={handleLoginChange}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button type="submit">Регистрация</button>
    </form>
  );
}
