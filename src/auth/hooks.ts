import { useState, useEffect } from 'react';

import * as yup from 'yup';

export const useValidEmail = (initialValue: string = '') => {
  const [email, setEmail] = useState(initialValue);
  const [emailIsValid, setEmailIsValid] = useState(true);

  useEffect(() => {
    const emailSchema = yup.object().shape({
      email: yup.string().email().required(),
    });

    const isValid = emailSchema.isValidSync({ email });

    setEmailIsValid(isValid);
  }, [email]);

  return { email, setEmail, emailIsValid };
}

export const useValidPassword = (initialPassword = '', initialConfirmPassword = '') => {
  const [password, setPassword] = useState(initialPassword);
  const [confirmPassword, setConfirmPassword] = useState(initialConfirmPassword);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(true);

  useEffect(() => {
    setPasswordIsValid(yup.string().min(8).isValidSync(password));
    setConfirmPasswordIsValid(password === confirmPassword);
  }, [password, confirmPassword]);

  return { password, setPassword, confirmPassword, setConfirmPassword, passwordIsValid, confirmPasswordIsValid };
}
