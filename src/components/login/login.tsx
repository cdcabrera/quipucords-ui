/**
 * Provides a login. Handles user authentication with visual feedback.
 * Uses PatternFly for UI and Axios for API requests, redirecting on successful login or displaying errors on failure.
 *
 * @module login
 */
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm, LoginPage } from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import { useLoginApi, useGetSetAuthApi } from '../../hooks/useLoginApi';
import bgImage from '../../images/aboutBg.png';

interface LoginProps {
  children: React.ReactNode;
  useGetSetAuth?: typeof useGetSetAuthApi;
  useLogin?: typeof useLoginApi;
}

const Login: React.FC<LoginProps> = ({ children, useGetSetAuth = useGetSetAuthApi, useLogin = useLoginApi }) => {
  const { t } = useTranslation();
  const { isAuthorized } = useGetSetAuth();
  const { login } = useLogin();
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [isLoginError, setIsLoginError] = React.useState<boolean>(false);
  const [isValidUsername, setIsValidUsername] = React.useState(true);
  const [isValidPassword, setIsValidPassword] = React.useState(true);
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  useEffect(() => {
    setIsLoggedIn(isAuthorized);
  }, [isAuthorized]);

  const onChangeUsername = (event: React.FormEvent<HTMLInputElement>, value: string) => {
    setIsValidUsername(value !== '');
    setUsername(value);
  };

  const onChangePassword = (event: React.FormEvent<HTMLInputElement>, value: string) => {
    setIsValidPassword(value !== '');
    setPassword(value);
  };

  const onLoginButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      if (username && password) {
        login({ username, password }).then(
          () => {
            setIsLoggedIn(true);
          },
          () => {
            setIsLoginError(true);
          }
        );
      }
    },
    [login, password, username]
  );

  if (isLoggedIn) {
    return children;
  }

  return (
    <LoginPage
      className="fadein"
      loginTitle={t('login.title')}
      textContent={t('login.description')}
      backgroundImgSrc={bgImage}
    >
      <LoginForm
        showHelperText={isLoginError}
        helperText={t('login.invalid')}
        helperTextIcon={<ExclamationCircleIcon />}
        usernameLabel={t('login.label', { context: 'username' })}
        usernameValue={username}
        onChangeUsername={onChangeUsername}
        isValidUsername={isValidUsername}
        passwordLabel={t('login.label', { context: 'password' })}
        passwordValue={password}
        onChangePassword={onChangePassword}
        isValidPassword={isValidPassword}
        onLoginButtonClick={onLoginButtonClick}
        loginButtonLabel={t('login.label', { context: 'login' })}
      />
    </LoginPage>
  );
};

export { Login as default, Login, type LoginProps };
