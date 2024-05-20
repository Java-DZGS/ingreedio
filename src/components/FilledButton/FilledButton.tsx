import React, { ReactNode } from 'react';
import './FilledButton.scss';
import Button from '../Button/Button';

type FilledButtonProps = {
  children?: ReactNode;
  isDisabled?: boolean;
  reverseGradient?: boolean;
  onClick?: () => void;
};

const FilledButton = ({
  children,
  reverseGradient = false,
  isDisabled = false,
  onClick = () => {},
}: FilledButtonProps): JSX.Element => (
  <Button
    onClick={!isDisabled ? onClick : () => {}}
    // eslint-disable-next-line no-nested-ternary
    className={`button ${isDisabled ? 'disabled' : reverseGradient ? 'reverse-gradient' : 'gradient'}`}
  >
    {children}
  </Button>
);

export default FilledButton;
