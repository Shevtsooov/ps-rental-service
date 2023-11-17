import React from 'react';
import './LoginPage.scss';
import { LoginForm } from '../../components/LoginForm/LoginForm';


export const LoginPage: React.FC = () => {
  return (
    <div className="loginPage">
      <LoginForm /> 
    </div>
  );
}
