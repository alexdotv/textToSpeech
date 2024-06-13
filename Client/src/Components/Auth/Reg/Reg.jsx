import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import '../Auth.css'

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
  
    if (!email || !login || !password) {
      message.warning('Fill in all fields!');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/registration', {
        email,
        login,
        password,
      });
      message.success('Fill in all fields!');
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
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
      <button type="submit">Registration</button>
    </form>
  );
}
