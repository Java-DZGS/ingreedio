import React, { ReactNode } from 'react';
import './FilledButton.scss';
import Button from '../Button/Button';

type FilledButtonProps = {
  children?: ReactNode;
  reverseGradient?: boolean;
  onClick?: () => void;
};

const FilledButton = ({
  children,
  reverseGradient = false,
  onClick = () => {},
}: FilledButtonProps): JSX.Element => (
  <Button
    onClick={onClick}
    className={`button ${reverseGradient ? 'reverse-gradient' : 'gradient'}`}
  >
    {children}
  </Button>
);

export default FilledButton;
