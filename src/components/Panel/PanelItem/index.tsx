import React, { useState } from 'react';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PanelType } from '..';

import './styles.css';

type Props = {
  text: string;
  index: number;
  type: PanelType;
  onRemove: (id: number) => void;
};

const PanelItem = ({ text, index, type, onRemove }: Props) => {
  const [likes, setLikes] = useState(0);

  return (
    <div className={`panel-item ${type}`} key={index}>
      <div className="panel-item-like">
        <FontAwesomeIcon
          icon={faHeart}
          title="Like"
          onClick={() => setLikes(likes => likes + 1)}
        />
        <span>{likes}</span>
      </div>
      <span>{text}</span>
      <FontAwesomeIcon
        icon={faTrash}
        title="Remove"
        onClick={() => onRemove(index)}
      />
    </div>
  );
};

export default PanelItem;
