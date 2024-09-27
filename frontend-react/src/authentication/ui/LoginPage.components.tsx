import React from 'react';
import styles from './LoginPage.module.css';
import { useHandleLoginSubmit, useHandlerInputsLogin } from '../application/login.hooks';



/**
 * Component for the login page.
 *
 * It renders a form with email and document inputs, and a submit button.
 * When the form is submitted, it calls the `handleLoginSubmit` function
 * that performs the actual login via the backend API. If there is an error
 * during the login process, it displays the error message.
 */
const LoginPage: React.FC = () => {
  const { loginUserData, setEmail, setDocument } = useHandlerInputsLogin();
  const { handleLoginSubmit, error, loading } = useHandleLoginSubmit(loginUserData);
  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <h2 className={styles.login__title}>Login</h2>
        <form className={styles.login__form} onSubmit={handleLoginSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          <label htmlFor="loginEmail" className={styles.login__label}>Email</label>
          <input
            type="email"
            id="loginEmail"
            className={styles.login__input}
            placeholder="Enter email"
            value={loginUserData.email}
            onChange={setEmail}
            required
          />
          <label htmlFor="loginDocument" className={styles.login__label}>Document</label>
          <input
            type="text"
            pattern='[0-9]*'
            id="loginDocument"
            className={styles.login__input}
            placeholder="Enter document"
            value={loginUserData.document}
            onChange={setDocument}
            required
          />
          <button type="submit" className={styles.login__submit} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
