import { useEffect, useState } from 'react';
import './RegistrationForm.scss';
import cn from 'classnames';
import { useAddNewUserMutation } from '../../Redux/RTK_Query/users.service';
import { RegistrationModal } from '../RegistrationModal/RegistrationModal';

type Props = {
  setWhatToShow: (option: string) => void,
};

export const RegistrationForm: React.FC<Props> = ({ setWhatToShow }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [fieldType, setFieldType] = useState('password');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [ addNewUser ] = useAddNewUserMutation();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';

      return;
    }
    window.scrollTo({
      top: 0, left: 0,
    });

    document.body.style.overflow = 'auto'
  }, [isModalOpen]);

  const changeInputType = () => {
    if (fieldType === 'password') {
      setFieldType('text');

      return;
    }

    setFieldType('password');
  };

  const handleAddPhoneNumber = (digit: string) => {
    if (!'0123456789'.includes(digit.slice(-1))) {
      return;
    }

    if(digit.length < 11) {
      setPhoneNumber(digit);

      return;
    }

    if ((phoneNumber + digit.slice(-1)).length === 11) {
      return;
    }

    setPhoneNumber(digit);
  };

  const registerNewUser = async () => {
    setIsModalOpen(true);
    setIsLoading(true);

    try {
      const newUser = {
        email,
        fullName,
        password,
        address,
        phoneNumber,
      };

      const response = await addNewUser(newUser);

      if (response) {
        console.log('A new user was added successfully:', response);
      }

    } catch (error) {
      console.error('Error adding question:', error);
      
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const clearFields = () => {
    setEmail('');
    setFullName('');
    setPassword('');
    setAddress('');
    setPhoneNumber('');
    setIsModalOpen(false);
  };
  
  return (
    <div className="registrationForm">

      {isModalOpen && (
        <RegistrationModal
          email={email}
          clearFields={clearFields}
          isLoading={isLoading}
        />
      )}

      <h1 className="registrationForm__title">
        Реєстрація
      </h1>

      <p className="registrationForm__description">
        Вже маєте аккаунт? Увійдіть
        <span 
          className="registrationForm__description--here"
          onClick={() => setWhatToShow('Авторизація')}
        >
          тут
        </span>
      </p>  

      <div className="registrationForm__field">
        <input
          className="registrationForm__field_input"
          placeholder="Ім'я та прізвище"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        {fullName !== '' && (
          <button
            className="registrationForm__field--clear"
            onClick={() => setFullName('')}
          />
        )}

      </div>

      <div className="registrationForm__field">
        <input
          className="registrationForm__field_input"
          placeholder="Адреса"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {address !== '' && (
          <button
            className="registrationForm__field--clear"
            onClick={() => setAddress('')}
          />
        )}

      </div>

      <div className="registrationForm__field">
        <input
          className="registrationForm__field_input"
          placeholder="Номер телефону - 0XX-XXX-XX-XX"
          type="text"
          
          value={phoneNumber}
          onChange={(e) => handleAddPhoneNumber(e.target.value)}
        />
        {phoneNumber !== '' && (
          <button
            className="registrationForm__field--clear"
            onClick={() => setPhoneNumber('')}
          />
        )}

      </div>
      
      <div className="registrationForm__field">
        <input
          className="registrationForm__field_input"
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

      <div className="registrationForm__field">
        <input
          className="registrationForm__field_input"
          placeholder='Придумайте надійний пароль'
          type={fieldType}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {password !== '' && (
          <>
            <button
              className="registrationForm__field_showPassword"
              onClick={changeInputType}
            />

            <button
              className="registrationForm__field--clear"
              onClick={() => setPassword('')}
            />
          </>
        )}
      </div>

      <div className="registrationForm__actions">
        <button
          className="registrationForm__actions_button registrationForm__actions_button--login"
          onClick={registerNewUser}
        >
          Далі
        </button>
      </div>
    </div>
  );
};
