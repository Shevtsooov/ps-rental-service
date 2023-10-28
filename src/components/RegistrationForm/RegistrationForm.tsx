import { useEffect, useState } from 'react';
import './RegistrationForm.scss';
import cn from 'classnames';

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
  
  return (
    <div className="registrationForm">

      <h1 className="registrationForm__title">
        Реєстрація
      </h1>

      <p className="registrationForm__description">
        {`Створіть аккаунт для зручності.\nВже маєте аккаунт? Увійдіть`}
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
        >
          Далі
        </button>
      </div>
    </div>
  );
}
