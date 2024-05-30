/* eslint-disable react/button-has-type */
import React, { ReactNode } from 'react';

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
};

const Button = ({
  children,
  onClick = () => {},
  className = '',
  type = 'button',
}: ButtonProps): JSX.Element => (
  <button
    type={type}
    className={className}
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
