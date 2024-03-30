import React from 'react';
import './TextButton.scss';
import Button from '../Button/Button';

interface TextButtonProps {
  label?: string;
  onClick?: () => void;
}

const TextButton = ({
  label = '',
  onClick = () => {},
}: TextButtonProps): JSX.Element => (
  <Button label={label} onClick={onClick} className="text-button" />
);

export default TextButton;
