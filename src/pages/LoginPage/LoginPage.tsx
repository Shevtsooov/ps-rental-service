import React, { useState } from 'react';
import './LoginPage.scss';
import { LoginForm } from '../../components/LoginForm/LoginForm';


export const LoginPage: React.FC = () => {

  return (
    <div className="loginPage">
      <h1 className="loginPage__title">
        Авторизація
      </h1>

      <LoginForm />
      
    </div>
  );
}
