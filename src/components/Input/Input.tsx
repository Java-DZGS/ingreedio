import React from 'react';
import './Input.scss';

type InputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
  pattern?: string;
};

const Input = ({
  label = '',
  placeholder = '',
  type = '',
  onChange = () => {},
  required = false,
  minLength = 0,
  pattern = '*',
}: InputProps): JSX.Element => {
  const id = `${label.split(' ').join('-').toLocaleLowerCase()}-${type}`;
  return (
    <label htmlFor={id} className="input-label">
      <div className="input-label-text">{label}</div>
      <input
        type={type}
        onChange={onChange}
        required={required}
        id={id}
        placeholder={placeholder}
        minLength={minLength}
        pattern={pattern}
        className="input"
      />
    </label>
  );
};

export default Input;
