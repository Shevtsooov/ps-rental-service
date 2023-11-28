import { useEffect, useState } from 'react';
import './RegistrationForm.scss';
import cn from 'classnames';
import { useGetAllUsersQuery } from '../../Redux/RTK_Query/users.service';
import { RegistrationModal } from '../RegistrationModal/RegistrationModal';
import { useRegisterUserMutation } from '../../Redux/RTK_Query/authApi.service';
import { NavLink } from 'react-router-dom';

export const RegistrationForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [fieldType, setFieldType] = useState('password');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const noErrors = {
    noFullName: false,
    shortUsername: '',
    noAddress: false, 
    shortAddress: '', 
    noPhoneNumber: false, 
    shortPhoneNumber: '', 
    noEmail: false, 
    incorrectEmail: '', 
    isEmailRegistered: '',
    noPassword: false, 
    weakPassword: '', 
  };
  
  const [error, setError] = useState(noErrors);

  const [ register ] = useRegisterUserMutation();

  const { data: users } = useGetAllUsersQuery();

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

    const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

    const isAlreadyRegistered = users?.find(user => (
      user.email === email
    ));

    const anyError = !email
    || !emailPattern.test(email)
    || email === ''
    || isAlreadyRegistered
    || !password
    || password.length < 6
    || !fullName
    || fullName.length < 6
    || address.length < 6
    || !address
    || !phoneNumber
    || phoneNumber.length !== 10;

    if (anyError) {
      if (fullName === '') {
        setError(error => ({
          ...error,
          noFullName: true
        }));
      }

      if (fullName.length < 6) {
        setError(error => ({
          ...error,
          shortUsername: 'Закоротке ім\'я та прізвище'
        }));
      }
  
      if (address === '') {
        setError(error => ({
          ...error,
          noAddress: true
        }));
      }
    
      if (address.length < 6) {
        setError(error => ({
          ...error,
          shortAddress: 'Закоротка адреса'
        }));
      }
  
      if (phoneNumber === '') {
        setError(error => ({
          ...error,
          noPhoneNumber: true
        }));
      }
    
      if (phoneNumber !== '' && phoneNumber.length !== 10) {
        setError(error => ({
          ...error,
          shortPhoneNumber: 'Номер має складатись з 10 цифр'
        }));
      }
      
      if (email === '') {
        setError(error => ({
          ...error,
          noEmail: true
        }));
      }
      
      if (email !== '' && !emailPattern.test(email)) {
        setError(error => ({
          ...error,
          incorrectEmail: 'Будь ласка, перевірте правильність email адреси'
        }));
      }
      
      if (isAlreadyRegistered) {
        setError(error => ({
          ...error,
          isEmailRegistered: 'Клієнт з такою поштою вже зареєстрований'
        }));
      }
  
      if (password === '') {
        setError(error => ({
          ...error,
          noPassword: true
        }));
      }
    
      if (password !== '' && password.length < 8) {
        setError(error => ({
          ...error,
          weakPassword: 'Закороткий пароль'
        }));
      }

      setTimeout(() => {
        setError(noErrors);
      }, 2000);

      return;
    }

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

    await register(newUser);

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
        <NavLink
          to='/login'
          className="registrationForm__description--here"
        >
          тут
        </NavLink>
      </p>  

      <div className="registrationForm__field">
        {fullName !== '' && error.shortUsername && (
          <p className="registrationForm__field_warning">
            {error.shortUsername}
          </p>
        )}
        <input
          className={cn("registrationForm__field_input", {
            "registrationForm__field_input--error": error.noFullName
          })}
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
        {address !== '' && error.shortAddress && (
          <p className="registrationForm__field_warning">
            {error.shortAddress}
          </p>
        )}
        <input
          className={cn("registrationForm__field_input", {
            "registrationForm__field_input--error": error.noAddress
          })}
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
        {error.shortPhoneNumber && (
          <p className="registrationForm__field_warning">
            {error.shortPhoneNumber}
          </p>
        )}

        <input
          className={cn("registrationForm__field_input", {
            "registrationForm__field_input--error": error.noPhoneNumber || error.shortPhoneNumber
          })}
          placeholder="Номер телефону - 0XX-XXX-XX-XX"
          type="text"
          autoComplete='off'
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
        {(error.incorrectEmail || error.isEmailRegistered) && (
          <p className="registrationForm__field_warning">
            {error.incorrectEmail || error.isEmailRegistered}
          </p>
        )}

        <input
          className={cn("registrationForm__field_input", {
            "registrationForm__field_input--error": error.noEmail || error.incorrectEmail || error.isEmailRegistered
          })}
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
        {error.weakPassword && (
          <p className="registrationForm__field_warning">
            {error.weakPassword}
          </p>
        )}
        
        <input
          className={cn("registrationForm__field_input", {
            "registrationForm__field_input--error": error.noPassword || error.weakPassword
          })}
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
