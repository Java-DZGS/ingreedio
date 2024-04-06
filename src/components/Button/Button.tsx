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
  <button
    type="button"
    className={className}
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'center',
    }}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
