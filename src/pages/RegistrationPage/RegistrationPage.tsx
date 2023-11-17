import React from 'react';
import './RegistrationPage.scss';
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';


export const RegistrationPage: React.FC = () => {
  return (
    <div className="registrationPage">
        <RegistrationForm />
    </div>
  );
}
