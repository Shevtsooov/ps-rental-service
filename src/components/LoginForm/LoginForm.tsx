import { useState } from 'react';
import './LoginForm.scss';
import { useLoginUserMutation } from '../../Redux/RTK_Query/users.service';
import { accessTokenService } from '../../helpers/accessTokenService';
import { setUser } from '../../Redux/Slices/first.slice';
import { useAppDispatch } from '../../Redux/store';
import { useNavigate } from "react-router-dom";

type Props = {
  setWhatToShow: (option: string) => void,
};

type credentials = {
  email: string,  
  password: string,
};

const emptyCredentials = {
  email: '',  
  password: '',
}

export const LoginForm: React.FC<Props> = ({ setWhatToShow }) => {
  const [credentials, setCredentials] = useState<credentials>(emptyCredentials);
  const [fieldType, setFieldType] = useState('password');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const changeInputType = () => {
    if (fieldType === 'password') {
      setFieldType('text');

      return;
    }

    setFieldType('password');
  };

  const [ loginUser ] = useLoginUserMutation();

  const setPassword = (pass: string) => {
    setCredentials({ ...credentials, password: pass })
  }

  const setEmail = (mail: string) => {
    setCredentials({ ...credentials, email: mail })
  }

  const login = async () => {
    try {
      const response = await loginUser(credentials);
      
      if ('data' in response) {
        const { accessToken, normalizedUser } = response.data;

        accessTokenService.save(accessToken);
        dispatch(setUser(normalizedUser));
        localStorage.setItem('user', JSON.stringify(normalizedUser))

        console.log('user - ', normalizedUser);
      }
    } catch (error) {
      // Handle errors here, for example, show an error message to the user.
      console.error('Login failed:', error);
    } finally {
      setPassword('');
      setEmail('');
      navigate("/");
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
        <button
          className="loginForm__actions_button loginForm__actions_button--registration"
          onClick={() => setWhatToShow('Реєстрація')}
        >
          Реєстрація
        </button>

        <button
          className="loginForm__actions_button loginForm__actions_button--login"
          onClick={login}
        >
          Увійти
        </button>
      </div>
    </div>
  );
}
