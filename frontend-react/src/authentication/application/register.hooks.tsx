
import React, { useState } from 'react';
import { useAuth } from '../application/useAuth.hooks';
import { useNavigate } from 'react-router-dom';
import { RegisterFormData } from '../domain/authentication.domain';

/**
 * Handles the state of the registration form and provides
 * functions to update the state
 *
 * @returns an object with the current state of the form
 * and functions to update it
 */
export const useHandlerInputsRegister = () => {
  const [registerUserData, setRegisterData] = useState<RegisterFormData>({
    email: '',
    document: '',
    name: '',
    phone: ''
  });



  /**
   * Updates the state of the registration form with the new email value
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by the input change
   */
  const setEmail: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email: string = e.target.value;
    setRegisterData({ ...registerUserData, email });
  }

  /**
   * Updates the state of the registration form with the new document value
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by the input change
   */
  const setDocument: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
    const document: string = e.target.value;
    setRegisterData({ ...registerUserData, document });
  }

  /**
   * Updates the state of the registration form with the new name value
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by the input change
   */
  const setName: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.value;
    setRegisterData({ ...registerUserData, name });
  }

  /**
   * Updates the state of the registration form with the new phone value
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by the input change
   */
  const setPhone: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone: string = e.target.value;
    setRegisterData({ ...registerUserData, phone });
  }

  return {
    registerUserData,
    setEmail,
    setDocument,
    setName,
    setPhone
  }
}

  /**
   * Handles the submission of the registration form, performing the actual registration via the backend API.
   *
   * @param {RegisterFormData} registerUserData - The data to be sent to the backend for registration
   * @returns An object containing the function to handle the form submission, as well as state for error and loading
   */
export const useHandleRegisterSubmit = (registerUserData: RegisterFormData) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(registerUserData.email, registerUserData.document, registerUserData.name, registerUserData.phone);
      navigate('/');
    } catch (err: unknown) {
      const error = (err instanceof Error) ? err : new Error(`${err}`);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleRegisterSubmit,
    error,
    loading
  }
}