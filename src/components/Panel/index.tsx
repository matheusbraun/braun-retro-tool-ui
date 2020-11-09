import React, { useState } from 'react';

import Input from '../Input';
import HeaderImage from './HeaderImage';
import PanelItem from './PanelItem';

import './styles.css';

export type PanelType = 'good' | 'wondering' | 'bad';

type Props = {
  type: PanelType;
  onSubmit: (value: string) => void;
  onRemove: (id: number) => void;
  panelItems: Array<string>;
};

const Panel = ({ type, onSubmit, onRemove, panelItems }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();

      setInputValue('');
      onSubmit(inputValue);
    }
  };

  return (
    <div className={`panel panel-${type}`}>
      <div className="panel-header">
        <HeaderImage type={type} />
      </div>
      <Input
        name={`input-${type}`}
        placeholder={getPlaceholderByPanelType(type)}
        value={inputValue}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        required
      />
      <div className="panel-items">
        {panelItems.map((item, index) => (
          <PanelItem
            index={index}
            text={item}
            type={type}
            onRemove={onRemove}
          />
        ))}
      </div>
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
