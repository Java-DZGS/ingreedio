/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilledButton from './FilledButton/FilledButton';
import logo from '../assets/logo.svg';
import './Header.scss';
import TextButton from './TextButton/TextButton';
import { ROUTES } from '../routes/routes';
import profileIcon from '../assets/icons/profile.svg';

const Header = (): ReactElement => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
      <div className="right-control-container">
        {isLoggedIn ? (
          <div className="profile-button-container">
            <TextButton onClick={() => navigate(ROUTES.PROFILE)}>
              <div>
                <img
                  src={profileIcon}
                  alt="profile icon"
                  width="25"
                  height="25"
                />
              </div>
              <div>Profile</div>
            </TextButton>
          </div>
        ) : (
          <div className="registration-login-container">
            <div className="button-container">
              <TextButton
                onClick={() => {
                  navigate(ROUTES.REGISTRATION);
                }}
              >
                Sign up
              </TextButton>
            </div>
            <div className="button-container">
              <FilledButton
                onClick={() => {
                  navigate(ROUTES.LOGIN);
                }}
              >
                Log in
              </FilledButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
