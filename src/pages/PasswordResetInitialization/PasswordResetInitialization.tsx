import { useEffect, useState } from 'react';
import './PasswordResetInitialization.scss';
import { useAppDispatch } from '../../Redux/store';
import { useGetAllUsersQuery } from '../../Redux/RTK_Query/users.service';
import { useNavigate } from 'react-router-dom';
import { useInitializePasswordResetMutation } from '../../Redux/RTK_Query/authApi.service';
import { Loader } from '../../components/Loader/Loader';
import checkEmail from '../../assets/gifs/checkEmail.gif'

const noErrors = {
  isEmailTypedIn: '',
  isEmailCorrect: '',
  noSuchUser: '',
};

export const PasswordResetInitialization = () => {
  const [error, setError] = useState(noErrors);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isResult, setIsResult] = useState(false);

  const handleSetEmail = (mail: string) => {
    setEmail(mail);
  };

  const { data: users } = useGetAllUsersQuery();
  const [ resetPassword, isSuccess ] = useInitializePasswordResetMutation();
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = 'Запит на відновлення пароля';
  }, []);


  const handleInitiateReset = async () => {
    const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;
    
    const isSuchUser = users?.find(user => (
      user.email === email
    ));

    const anyError = !email
      || !emailPattern.test(email)
      || !isSuchUser;

    if (anyError) {

      if (!email) {
        setError(error => ({
          ...error,
          isEmailTypedIn: 'Будь ласка, введіть email адресу'
        }));
      }

      if (!emailPattern.test(email)) {
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

      setTimeout(() => {
        setError(noErrors);
      }, 2000);

      return;
    }

    try {
      setIsLoading(true);

      await resetPassword({ email });

      if (isSuccess) {
        setIsResult(true);
        setIsLoading(false);

        // setTimeout(() => {
        //   setIsResult(false);
        //   navigate('/');
        // }, 4000);
      }

    } catch (error: any) {
      console.error('Login failed:', error);
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
          className='pRI__modal'
        >
          <img
            src={checkEmail}
            alt=""
            className="pRI__modal__img"
          />
          <h4>Запит на зміну пароля створено</h4>
          <p>Очікуйте email з унікальним посиланням</p>

          <button
            className="pRI__modal__button"
            onClick={closeModal}
          >
            OK
          </button>
        </div>
      )}

      <div className="pRI">
      <h1 className="pRI__title">
        Відновлення пароля
      </h1>

      {isLoading
        ? <Loader />
        : (
          <>
            <div className="pRI__field">
              {error.isEmailTypedIn && (
                <p className="pRI__field_warning">
                  {error.isEmailTypedIn}
                </p>
              )}

              {email !== '' && error.isEmailCorrect && (
                <p className="pRI__field_warning">
                  {error.isEmailCorrect}
                </p>
              )}

              {error.noSuchUser && !error.isEmailCorrect && (
                <p className="pRI__field_warning">
                  {error.noSuchUser}
                </p>
              )}
              <input
                className="pRI__field_input"
                placeholder='Email'
                type="email"
                value={email}
                onChange={(e) => handleSetEmail(e.target.value)}
              />
              {email !== '' && (
                <button
                  className="pRI__field--clear"
                  onClick={() => setEmail('')}
                />
              )}
            </div>

            <div className="pRI__actions">
              <button
                className="pRI__actions_button"
                onClick={handleInitiateReset}
              >
                Надіслати посилання
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
