import React, { useState } from 'react';
import Login from '../../Components/Login/Login';
import Reg from '../../Components/Reg/Reg';
import './Auth.css';

export default function Auth() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div className="auth">
      {isLoginForm ? <Login /> : <Reg />}
      <a onClick={toggleForm}>
        {isLoginForm ? 'Еще нет аккаунта?' : 'Уже есть аккаунт? '}
        {isLoginForm ? <span className='underline'>Зарегистрироваться</span> : <span className='underline'>Войти</span>}
      </a>
    </div>
  );
}
