import React, { useEffect } from 'react';
import './RegistrationPage.scss';
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';


export const RegistrationPage: React.FC = () => {

  useEffect(() => {
    document.title = 'Реєстрація';
  }, []);

  return (
    <div className="registrationPage">
        <RegistrationForm />
    </div>
  );
}
