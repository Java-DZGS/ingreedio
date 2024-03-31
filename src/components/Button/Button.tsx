import React, { ReactNode } from 'react';

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
};

const Button = ({
  children,
  onClick = () => {},
  className = '',
}: ButtonProps): JSX.Element => (
  <button type="button" className={className} onClick={onClick}>
    {children}
  </button>
);

export default Button;
