import React, { memo } from 'react';

import './styles.css';

type Props = {
  name: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
};

const Input = ({
  name,
  disabled = false,
  onChange,
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
      value={value}
      type={type}
      required={required}
      placeholder={placeholder}
    />
  </div>
);

export default memo(Input);
