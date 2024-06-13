import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import '../Auth.css';

export default function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!login || !password) {
      message.error('Пожалуйста, заполните все поля');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/login', {
        login,
        password,
      });

      console.log('Успешный вход');

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('history',response.data.history)

      message.success('Succses');
    } catch (error) {
      console.error('Ошибка:', error);
      message.error('Ошибка при входе');
    }
  };

  return (
    <div>
      <form className="auth-form" onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
