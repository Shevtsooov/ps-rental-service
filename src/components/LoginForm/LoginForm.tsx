import { useState } from 'react';
import './LoginForm.scss';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldType, setFieldType] = useState('password');

  const changeInputType = () => {
    if (fieldType === 'password') {
      setFieldType('text');

      return;
    }

    setFieldType('password');
  }
  return (
    <div className="loginForm">
      <div className="loginForm__field">
        <input
          className="loginForm__field_input"
          placeholder='Email'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="loginForm__field">
        <input
          className="loginForm__field_input loginForm__field_input--spaced"
          placeholder='Пароль'
          type={fieldType}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {password !== '' && (
          <button
            className="loginForm__field_showPassword"
            onClick={changeInputType}
          />
        )}

        <button className="loginForm__field_lostPassword">
          відновити пароль
        </button>
      </div>

      <div className="loginForm__actions">
        <button
          className="loginForm__actions_button loginForm__actions_button--registration"
        >
          Реєстрація
        </button>

        <button
          className="loginForm__actions_button loginForm__actions_button--login"
        >
          Увійти
        </button>
      </div>
    </div>
  );
}
