import React, { useState } from 'react';
import './LoginPage.scss';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';


export const LoginPage: React.FC = () => {
  const [whatToShow, setWhatToShow] = useState('Реєстрація');

  return (
    <div className="loginPage">

      {whatToShow === 'Авторизація' && (
        <LoginForm 
          setWhatToShow={setWhatToShow}
        />
      )}

      {whatToShow === 'Реєстрація' && (
        <RegistrationForm
          setWhatToShow={setWhatToShow}
        />
      )}
      
    </div>
  );
}
