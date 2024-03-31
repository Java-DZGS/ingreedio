/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './FilledButton/FilledButton';
import logo from '../assets/logo.svg';
import './Header.scss';
import TextButton from './TextButton/TextButton';
import { ROUTES } from '../routes/routes';

const Header = (): ReactElement => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div
        className="logo-container"
        role="button"
        onClick={() => navigate(ROUTES.HOME)}
        tabIndex={0}
      >
        <img src={logo} alt="Logo" />
      </div>
      <div className="registration-login-container">
        <div className="button-container">
          <TextButton
            label="Sign up"
            onClick={() => {
              navigate(ROUTES.REGISTRATION);
            }}
          />
        </div>
        <div className="button-container">
          <Button
            label="Log in"
            onClick={() => {
              navigate(ROUTES.LOGIN);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
