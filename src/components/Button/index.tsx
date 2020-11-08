import React, { memo } from 'react';

import './styles.css';

type Props = {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  title: string;
};

const Button = ({
  type = 'button',
  disabled = false,
  onClick,
  className,
  title,
}: Props) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`ui-button ${className}`}
  >
    {title}
  </button>
);

export default memo(Button);
