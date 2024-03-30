import React from 'react';
import './FilledButton.scss';
import Button from '../Button/Button';

type FilledButtonProps = {
  label?: string;
  onClick?: () => void;
};

const FilledButton = ({
  label = '',
  onClick = () => {},
}: FilledButtonProps): JSX.Element => (
  <Button label={label} onClick={onClick} className="button" />
);

export default FilledButton;
