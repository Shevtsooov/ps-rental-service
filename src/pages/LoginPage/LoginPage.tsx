import React, { useState } from 'react';
import './LoginPage.scss';


export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldType, setFieldType] = useState('password');

  return (
    <div className="loginPage">
      <h1 className="loginPage__title">
        Авторизація
      </h1>

      <div className="loginPage__form">
        <div className="loginPage__form_field">
          <input
            className="loginPage__input"
            placeholder='Email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="loginPage__form_field">
          <input
            className="loginPage__input loginPage__input--spaced"
            placeholder='Пароль'
            type={fieldType}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {password !== '' && (
            <button
              className="loginPage__showPassword"
              onMouseDown={() => setFieldType('text')}
              onMouseUp={() => setFieldType('password')}
            />
          )}

          <button className="loginPage__lostPassword">
            відновити пароль
          </button>
        </div>

        <div className="loginPage__form_actions">
          <button
            className="loginPage__form_button loginPage__form_button--registration"
          >
            Реєстрація
          </button>

          <button
            className="loginPage__form_button loginPage__form_button--login"
          >
            Увійти
          </button>
        </div>
      </div>
    </div>
  );
}
