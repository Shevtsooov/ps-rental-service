import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import './AccountActivationPage.scss';
import { useActivateUserQuery } from '../../Redux/RTK_Query/users.service';


export const AccountActivationPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const { activationToken } = useParams<{ activationToken: string }>();

  const { data: activateData, isSuccess } = useActivateUserQuery(activationToken || '');

  useEffect(() => {
    if (activateData) {
      // Check if the activation was successful, you might have a specific field in your response to indicate success.
      if (isSuccess) {
        setDone(true);
      } else {
        setError('Activation failed. Please try again or contact support.');
        setDone(true);
      }
    } 
  }, [activateData, isSuccess]);

  if (!done) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="title">Активація аккаунту</h1>

      {error
        ? (
          <p className="notification is-danger is-light">
            {error}
          </p>
        )
        : (
          <p className="notification is-success is-light">
            Ваш аккаунт активований
          </p>
        )
        }
    </>
  );
};
