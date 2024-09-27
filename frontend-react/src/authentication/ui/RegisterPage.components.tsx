import React from 'react';
import styles from './RegisterPage.module.css';
import { useHandleRegisterSubmit, useHandlerInputsRegister } from '../application/register.hooks';

/**
 * A component representing the registration page of the application, which allows users to create
 * a new account. It displays a form with input fields for name, email, document and phone number.
 * When the form is submitted, it uses the backend API to create a new user account. The form
 * displays errors if the registration fails, and disables the submit button while the request is
 * being processed.
 */
const RegisterPage: React.FC = () => {
  const { registerUserData, setEmail, setDocument, setName, setPhone } = useHandlerInputsRegister();
  const { handleRegisterSubmit, error, loading } = useHandleRegisterSubmit(registerUserData);
  return (
    <div className={styles.register}>
      <div className={styles.register__container}>
        <h2 className={styles.register__title}>Register</h2>
        <form className={styles.register__form} onSubmit={handleRegisterSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          <label htmlFor="registerName" className={styles.register__label}>Name</label>
          <input
            type="text"
            id="registerName"
            className={styles.register__input}
            placeholder="Enter your name"
            value={registerUserData.name}
            onChange={setName}
            required
          />
          <label htmlFor="registerEmail" className={styles.register__label}>Email</label>
          <input
            type="email"
            id="registerEmail"
            className={styles.register__input}
            placeholder="Enter email"
            value={registerUserData.email}
            onChange={setEmail}
            required
          />
          <label htmlFor="registerDocument" className={styles.register__label}>Document</label>
          <input
            type="text"
            pattern='[0-9]*'
            id="registerDocument"
            className={styles.register__input}
            placeholder="Enter document"
            value={registerUserData.document}
            onChange={setDocument}
            required
          />
          <label htmlFor="registerPhone" className={styles.register__label}>Phone</label>
          <input
            type="text"
            id="registerPhone"
            className={styles.register__input}
            placeholder="Enter phone number"
            value={registerUserData.phone}
            onChange={setPhone}
            required
          />
          <button type="submit" className={styles.register__submit} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
