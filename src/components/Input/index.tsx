import React, { memo } from 'react';

import './styles.css';

type Props = {
  name: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
};

const Input = ({
  name,
  disabled = false,
  onChange,
  onKeyDown,
  value,
  required = false,
  type = 'text',
  placeholder,
}: Props) => (
  <div className="input-block">
    <input
      name={name}
      disabled={disabled}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
      type={type}
      required={required}
      placeholder={placeholder}
      autoComplete="off"
    />
  </div>
);

export default memo(Input);
