import React, { ReactNode } from 'react';
import './FilledButton.scss';
import Button from '../Button/Button';

type FilledButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
};

const FilledButton = ({
  children,
  onClick = () => {},
}: FilledButtonProps): JSX.Element => (
  <Button onClick={onClick} className="button">
    {children}
  </Button>
);

export default FilledButton;
