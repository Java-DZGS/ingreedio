/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactElement } from 'react';
import Button from './FilledButton/FilledButton';
import logo from '../assets/logo.svg';
import './Header.scss';
import TextButton from './TextButton/TextButton';

const Header = (): ReactElement => (
  <div className="header">
    <div className="logo-container">
      <img src={logo} alt="Logo" />
    </div>
    <div className="registration-login-container">
      <div className="button-container">
        <TextButton label="Sign up" onClick={() => {}} />
      </div>
      <div className="button-container">
        <Button label="Login" onClick={() => {}} />
      </div>
    </div>
  </div>
);

export default Header;
