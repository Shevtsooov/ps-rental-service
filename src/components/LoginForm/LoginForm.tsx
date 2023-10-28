import { useState } from 'react';
import './LoginForm.scss';

type Props = {
  setWhatToShow: (option: string) => void,
};

export const LoginForm: React.FC<Props> = ({ setWhatToShow }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldType, setFieldType] = useState('password');

  const changeInputType = () => {
    if (fieldType === 'password') {
      setFieldType('text');

      return;
    }

    setFieldType('password');
  };

  return (
    <div className="loginForm">
      <h1 className="loginForm__title">
        Авторизація
      </h1>

      <p className="loginForm__description">
        {`Створіть аккаунт для зручності.\тВже Маєте аккаунт? Увійдіть`}
        <span>
          тут
        </span>
      </p>     
      
      <div className="loginForm__field">
        <input
          className="loginForm__field_input"
          placeholder='Email'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {email !== '' && (
          <button
            className="registrationForm__field--clear"
            onClick={() => setEmail('')}
          />
        )}
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
          <>
            <button
              className="loginForm__field_showPassword"
              onClick={changeInputType}
            />

            <button
              className="registrationForm__field--clear"
              onClick={() => setPassword('')}
            />
          </>

        )}

        <button className="loginForm__field_lostPassword">
          відновити пароль
        </button>
      </div>

      <div className="loginForm__actions">
        <button
          className="loginForm__actions_button loginForm__actions_button--registration"
          onClick={() => setWhatToShow('Реєстрація')}
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
