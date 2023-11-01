import { Loader } from '../Loader/Loader';
import checkEmail from '../../assets/gifs/checkEmail.gif'
import './RegistrationModal.scss';

type Props = {
  email: string,
  clearFields: () => void,
  isLoading: boolean
};

export const RegistrationModal: React.FC<Props> = ({
  email,
  clearFields,
  isLoading,
}) => {

  return (
    <div className="registrationModal">
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <h1 className="registrationModal__title">Аккаунт створено успішно</h1>

          <p className="registrationModal__notice">Залишилось активувати його</p>
          
          <img
            src={checkEmail}
            alt=""
            className="registrationModal__img"
          />

          <p className="registrationModal__notice">Будь ласка, перевірте свою скриньку:</p>
          <p className="registrationModal__smallNotice">Також не забудьте перевірити папку "Спам"</p>

          <h3 className="registrationModal__email">{email}</h3>


          <button
            className="registrationModal__button"
            onClick={clearFields}
          >
            OK
          </button>
        </>
      )}
    </div>
  );
};
