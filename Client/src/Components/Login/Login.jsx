import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

export default function Reg() {
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

    try {
      const response = await axios.post('http://localhost:3000/submit', {
        login,
        password,
      });

      console.log('Данные успешно отправлены на сервер');
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        placeholder='Login'
        type="text"
        value={login}
        onChange={handleLoginChange}
      />
      <input
        placeholder='Password'
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button type='submit'>Login</button>
    </form>
  );
}
