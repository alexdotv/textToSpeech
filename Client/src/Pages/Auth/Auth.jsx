import React, { useState } from 'react';
import Login from '../../Components/Auth/Login/Login';
import Reg from '../../Components/Auth/Reg/Reg';
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
        {isLoginForm ? "You don't have an account yet?" : 'Already have an account? '}
        {isLoginForm ? <span className='underline'>Sign up</span> : <span className='underline'>Sign in</span>}
      </a>
    </div>
  );
}
