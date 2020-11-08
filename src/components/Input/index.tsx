import React from 'react';

import './styles.css';

type Props = {
  name: string;
  disabled?: boolean;
  onChangeCallback?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
};

const Input = ({
  name,
  disabled = false,
  onChangeCallback,
  value,
  required = false,
  type = 'text',
  placeholder,
}: Props) => (
  <div className="input-block">
    <input
      name={name}
      disabled={disabled}
      onChange={onChangeCallback}
      value={value}
      type={type}
      required={required}
      placeholder={placeholder}
    />
  </div>
);

export default Input;
