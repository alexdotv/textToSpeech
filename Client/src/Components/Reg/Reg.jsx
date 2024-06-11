import React, { useState } from 'react';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, login, password });
  };

  return (
    <form className="reg-form" onSubmit={handleSubmit}>
      <input
        placeholder='Email'
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
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
      <button type='submit'>Registration</button>
    </form>
  );
}
