import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import './Login.css';

export default function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { login: authLogin } = useContext(AuthContext);

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        login,
        password,
      });

      console.log('Успешный вход:', response.data);
      localStorage.setItem('token', response.data.token);
      authLogin();
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
