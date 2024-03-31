import React, { ReactNode } from 'react';
import './TextButton.scss';
import Button from '../Button/Button';

interface TextButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

const TextButton = ({
  children,
  onClick = () => {},
}: TextButtonProps): JSX.Element => (
  <Button onClick={onClick} className="text-button">
    {children}
  </Button>
);

export default TextButton;
