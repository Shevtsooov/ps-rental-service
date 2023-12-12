import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PasswordResetPage.scss';
import { useAppDispatch } from '../../Redux/store';
import { useGetAllUsersQuery } from '../../Redux/RTK_Query/users.service';
import { useResetPasswordMutation } from '../../Redux/RTK_Query/authApi.service';
import { Loader } from '../../components/Loader/Loader';
import unlocked from '../../assets/gifs/passReset1.gif'

const noErrors = {
  isPasswordTypedIn: '', 
  weakPassword: '', 
};

export const PasswordResetPage = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isResult, setIsResult] = useState(false);

  const { data: users } = useGetAllUsersQuery();
  const [ resetPassword, isSuccess ] = useResetPasswordMutation();

  const dispatch = useAppDispatch();
  const [fieldType, setFieldType] = useState('password');

  const { resetToken } = useParams<{ resetToken: string }>();

  const [error, setError] = useState(noErrors);

  useEffect(() => {
    document.title = 'Відновлення пароля';
  }, []);

  const changeInputType = () => {
    if (fieldType === 'password') {
      setFieldType('text');

      return;
    }

    setFieldType('password');
  };
  useEffect(() => {

    if (users) {
    console.log('here')
    console.log(users)
    console.log(resetToken)

      const isSuchUser = users?.some(user => (
        user.resetToken === resetToken
      ));
  
    console.log(isSuchUser)

      
      if (isSuchUser) {
        return;
      } else {
        navigate('/');
      }
    }
  }, [resetToken, users]);


  const handleResetPassword = async () => {

    const anyError = !password
      || password.length < 8;

    if (anyError) {

      if (!password) {
        setError(error => ({
          ...error,
          isPasswordTypedIn: 'Будь ласка, введіть пароль'
        }));

        setTimeout(() => {
          setError(noErrors);
        }, 2000);
  
        return;
      }

      if (password.length < 8) {
        setError(error => ({
          ...error,
          weakPassword: 'Закороткий пароль. Введіть мінімум 8 символів'
        }));

        setTimeout(() => {
          setError(noErrors);
        }, 2000);
  
        return;
      }
    }

    try {
      setIsLoading(true);

      if (resetToken) {
        await resetPassword({
          password,
          resetToken,
        });
      }

      if (isSuccess) {
        setIsLoading(false);
        setIsResult(true);

        // setTimeout(() => {
        //   setIsResult(false);
        //   navigate('/login');
        // }, 4000);
      }

    } catch (error: any) {
      console.error('Password reset failed:', error);
    }
  };

  const closeModal = () => {
    setIsResult(false);
    navigate('/');
  }

  return (
    <>
      {isResult && (
        <div
          className='pRp__modal'
        >
          <img
            src={unlocked}
            alt=""
            className="pRp__modal__img"
          />
          <h4>Ваш пароль успішно змінено</h4>

          <button
            className="pRp__modal__button"
            onClick={closeModal}
          >
            OK
          </button>
        </div>
      )}

      <div className="pRp">
        <h1 className="pRp__title">
          Відновлення пароля
        </h1>
        <p className="pRp__description">Вкажіть ваш новий пароль</p>

        {isLoading
          ? <Loader />
          : (
            <>
              <div className="pRp__field">
                {error.isPasswordTypedIn && (
                  <p className="pRp__field_warning">
                    {error.isPasswordTypedIn}
                  </p>
                )}

                {error.weakPassword && (
                  <p className="pRp__field_warning">
                    {error.weakPassword}
                  </p>
                )}

                <input
                  className="pRp__field_input pRp__field_input--spaced"
                  placeholder='Пароль'
                  type={fieldType}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {password !== '' && (
                  <>
                    <button
                      className="pRp__field_showPassword"
                      onClick={changeInputType}
                    />

                    <button
                      className="registrationForm__field--clear"
                      onClick={() => setPassword('')}
                    />
                  </>
                )}
              </div>

              <div className="pRI__actions">
                <button
                  className="pRI__actions_button"
                  onClick={handleResetPassword}
                >
                  Змінити пароль
                </button>
              </div>
            </>
          )}
      </div>
    </>
  );
};
