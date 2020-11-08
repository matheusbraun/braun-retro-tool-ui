import React from 'react';

import './styles.css';

type Props = {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClickCallback?: () => void;
  cssClass?: string;
  title: string;
};

const Button = ({
  type = 'button',
  disabled = false,
  onClickCallback,
  cssClass = '',
  title,
}: Props) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClickCallback}
    className={`ui-button ${cssClass}`}
  >
    {title}
  </button>
);

export default Button;
