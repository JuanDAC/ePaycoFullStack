
import React, { useState } from 'react';
import { useAuth } from './useAuth.hooks';
import { useNavigate } from 'react-router-dom';
import { LoginFromData } from '../domain/authentication.domain';


/**
 * Handles the state of the login form and provides
 * functions to update the state
 *
 * @returns an object with the current state of the form
 * and functions to update it
 */
export const useHandlerInputsLogin = () => {
  const [loginUserData, setLoginData] = useState<LoginFromData>({ email: '', document: '' });

  /**
   * Updates the state of the login form with the new email value
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by the input change
   */
  const setEmail: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email: string = e.target.value;
    setLoginData({ ...loginUserData, email });
  }

  /**
   * Updates the state of the login form with the new document value
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by the input change
   */
  const setDocument: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
    const document: string = e.target.value;
    setLoginData({ ...loginUserData, document });
  }

  return {
    loginUserData,
    setEmail,
    setDocument
  }
}

/**
 * Handles the submission of the login form, performing the actual login via the backend API.
 *
 * @param {LoginData} loginUserData - The data to be sent to the backend for login
 * @returns An object containing the function to handle the form submission, as well as state for error and loading
 */
export const useHandleLoginSubmit = (loginUserData: LoginFromData) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);



  /**
   * Handles the submission of the login form, performing the actual login via the backend API.
   *
   * @param {React.FormEvent} e - The event triggered by the form submission
   */
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(loginUserData.email, loginUserData.document);
      navigate('/');
    } catch (err: unknown) {
      const error = (err instanceof Error) ? err : new Error(`${err}`) ;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLoginSubmit,
    error,
    loading
  }
  
}