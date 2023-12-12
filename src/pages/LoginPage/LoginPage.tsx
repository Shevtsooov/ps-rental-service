import React, { useEffect } from 'react';
import './LoginPage.scss';
import { LoginForm } from '../../components/LoginForm/LoginForm';


export const LoginPage: React.FC = () => {

  useEffect(() => {
    document.title = 'Авторизація';
  }, []);

  return (
    <div className="loginPage">
      <LoginForm /> 
    </div>
  );
}
