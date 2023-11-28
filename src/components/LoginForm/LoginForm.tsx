import { useState } from 'react';
import './LoginForm.scss';

import { useAppDispatch } from '../../Redux/store';
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from '../../Redux/RTK_Query/authApi.service';
import { setUser } from '../../Redux/Slices/user.slice';
import { refreshTokenService } from '../../helpers/refreshTokenService';
import { useGetAllUsersQuery } from '../../Redux/RTK_Query/users.service';
import cn from 'classnames';

type credentials = {
  email: string,  
  password: string,
};

const emptyCredentials = {
  email: '',  
  password: '',
};

const noErrors = {
  isEmailTypedIn: '',
  isEmailCorrect: '',
  noSuchUser: '',
  isPasswordTypedIn: '',
  incorrectPassword: '', 
};

export const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState<credentials>(emptyCredentials);
  const [fieldType, setFieldType] = useState('password');
  const { data: users } = useGetAllUsersQuery();
  
  const [error, setError] = useState(noErrors);
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const changeInputType = () => {
    if (fieldType === 'password') {
      setFieldType('text');

      return;
    }

    setFieldType('password');
  };

  const [ login, isLoading ] = useLoginUserMutation();

  const setPassword = (pass: string) => {
    setCredentials({ ...credentials, password: pass })
  }

  const setEmail = (mail: string) => {
    setCredentials({ ...credentials, email: mail })
  }



  const handleLogin = async () => {
    const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;
    
    const isSuchUser = users?.find(user => (
      user.email === credentials.email
    ));

    const anyError = !credentials.email
      || !emailPattern.test(credentials.email)
      || error.noSuchUser
      || !credentials.password
      || !isSuchUser;

    if (anyError) {

      if (!credentials.email) {
        setError(error => ({
          ...error,
          isEmailTypedIn: 'Будь ласка, введіть email адресу'
        }));
      }

      if (!emailPattern.test(credentials.email)) {
        setError(error => ({
          ...error,
          isEmailCorrect: 'Будь ласка, перевірте правильність email адреси'
        }));
      }

      if (!isSuchUser) {
        setError(error => ({
          ...error,
          noSuchUser: 'На жаль, такого юзера не існує.'
        }));
      }

      if (!credentials.password) {
        setError(error => ({
          ...error,
          isPasswordTypedIn: 'Будь ласка, введіть пароль'
        }));
      }

      setTimeout(() => {
        setError(noErrors);
      }, 2000);

      return;
    }

    try {

      const response = await login(credentials);
      
      if (!('data' in response)) {
        setError(error => ({
          ...error,
          incorrectPassword: 'Невірний пароль'
        }));

        setTimeout(() => {
          setError(noErrors);
        }, 2000);
  
        return;
      }

      if ('data' in response) {
        const { refreshToken, user } = response.data;

        refreshTokenService.save(refreshToken);
        dispatch(setUser(user));

        setPassword('');
        setEmail('');
        navigate("/");
      }
    } catch (error: any) {
      // Handle errors here, for example, show an error message to the user.
      // console.log('error.originalStatus) - ', error.originalStatus);
      console.log('Login failed:', error);
    }
  };

  return (
    <div className="loginForm">
      <h1 className="loginForm__title">
        Авторизація
      </h1>
{/* 
      <p className="loginForm__description">
        {`Створіть аккаунт для зручності.\тВже Маєте аккаунт? Увійдіть`}
        <span>
          тут
        </span>
      </p>      */}
      
      <div className="loginForm__field">
        {error.isEmailTypedIn && (
          <p className="loginForm__field_warning">
            {error.isEmailTypedIn}
          </p>
        )}

        {credentials.email !== '' && error.isEmailCorrect && (
          <p className="loginForm__field_warning">
            {error.isEmailCorrect}
          </p>
        )}

        {error.noSuchUser && !error.isEmailCorrect && (
          <p className="loginForm__field_warning">
            {error.noSuchUser}
          </p>
        )}
        <input
          className="loginForm__field_input"
          placeholder='Email'
          type="email"
          value={credentials.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {credentials.email !== '' && (
          <button
            className="registrationForm__field--clear"
            onClick={() => setEmail('')}
          />
        )}
      </div>

      <div className="loginForm__field">
        {error.isPasswordTypedIn && (
          <p className="loginForm__field_warning">
            {error.isPasswordTypedIn}
          </p>
        )}

        {error.incorrectPassword && (
          <p className="loginForm__field_warning">
            {error.incorrectPassword}
          </p>
        )}

        <input
          className="loginForm__field_input loginForm__field_input--spaced"
          placeholder='Пароль'
          type={fieldType}
          value={credentials.password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {credentials.password !== '' && (
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
        <NavLink
          to="/registration"
          className="loginForm__actions_button loginForm__actions_button--registration"
          // onClick={() => setWhatToShow('Реєстрація')}
        >
          Реєстрація
        </NavLink>

        <button
          className="loginForm__actions_button loginForm__actions_button--login"
          onClick={handleLogin}
        >
          Увійти
        </button>
      </div>
    </div>
  );
}
