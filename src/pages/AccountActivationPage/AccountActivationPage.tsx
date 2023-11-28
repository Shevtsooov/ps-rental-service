import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import './AccountActivationPage.scss';
import { useActivateUserQuery } from '../../Redux/RTK_Query/users.service';
import { setUser } from '../../Redux/Slices/user.slice';
import { useAppDispatch } from '../../Redux/store';
import { refreshTokenService } from '../../helpers/refreshTokenService';


export const AccountActivationPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const dispatch = useAppDispatch();

  const { activationToken } = useParams<{ activationToken: string }>();

  const { data: activateData, isSuccess, isError} = useActivateUserQuery(activationToken || '');

  useEffect(() => {
    if (isSuccess) {
      const { refreshToken, user } = activateData;

      refreshTokenService.save(refreshToken);
      dispatch(setUser(user));

      setDone(true);
      return;
    } 
    
    if (isError) {
      setError('На жаль, активація аккаунту не виконана.');
      setDone(true);
    }
  }, [activateData, isSuccess, isError, dispatch]);

  if (!done) {
    return <Loader />;
  }

  return (
    <div className="acAcPage">
      <h1 className="acAcPage__title">Активація аккаунту</h1>

      {error
        ? (
          <p className="acAcPage__error">
            {error}
          </p>
        )
        : (
          <>
            <p className="acAcPage__success">
              Ваш аккаунт успішно активовано.
            </p>

            <NavLink to="/games" className="acAcPage__button">
              До ігор
            </NavLink>
          </>
       )
      }
    </div>
  );
};
