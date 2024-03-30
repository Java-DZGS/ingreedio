import React from 'react';

type ButtonProps = {
  label: string;
  onClick: () => void;
  className: string;
};

const Button = ({
  label = '',
  onClick = () => {},
  className = '',
}: ButtonProps): JSX.Element => (
  <button type="button" className={className} onClick={onClick}>
    {label}
  </button>
);

export default Button;
