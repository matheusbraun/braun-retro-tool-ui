import React, { useState } from 'react';

import Input from '../Input';
import GoodLogo from '../../assets/images/iconfinder_good.svg';
import BadLogo from '../../assets/images/iconfinder_bad.svg';
import Wondering from '../../assets/images/iconfinder_wondering.svg';

import './styles.css';

type PanelType = 'good' | 'wondering' | 'bad';

type Props = {
  type: PanelType;
};

const Panel = ({ type }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const HeaderImage = () => {
    if (type === 'good') return <img src={GoodLogo} alt="text" />;

    if (type === 'bad') return <img src={BadLogo} alt="text" />;

    return <img src={Wondering} alt="text" />;
  };

  return (
    <div className={`panel panel-${type}`}>
      <div className="panel-header">
        <HeaderImage />
      </div>
      <Input
        name={`input-${type}`}
        placeholder={getPlaceholderByPanelType(type)}
        value={inputValue}
        onChange={handleOnChange}
        required
      />
    </div>
  );
};

const getPlaceholderByPanelType = (type: PanelType) => {
  switch (type) {
    case 'good':
      return "I'm glad that...";
    case 'wondering':
      return "I'm wondering about...";
    case 'bad':
      return "It wasn't so great that...";
  }
};

export default Panel;
