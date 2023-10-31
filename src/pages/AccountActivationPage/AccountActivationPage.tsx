import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import './AccountActivationPage.scss';


export const AccountActivationPage = () => {
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const { activationToken } = useParams();

  // useEffect(() => {
  //   activate(activationToken)
  //     .catch(error => {
  //       setError(error.response?.data?.message || `Wrong activation link`);
  //     })
  //     .finally(() => {
  //       setDone(true);
  //     });
  // }, []);

  // if (!done) {
  //   return <Loader />
  // };

  return (
    <>
      <h1 className="title">Активація аккаунту</h1>

      {error ? (
        <p className="notification is-danger is-light">
          {error}
        </p>
      ) : (
        <p className="notification is-success is-light">
          Ваш аккаунт активований
        </p>
      )}
    </>
  );
};
