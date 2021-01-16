import React, { useState } from 'react';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PanelType } from '..';
import { useAuth } from '../../../hooks/useAuth';

import './styles.css';

type Props = {
  text: string;
  index: number;
  type: PanelType;
  onRemove: (id: number) => void;
};

const PanelItem = ({ text, index, type, onRemove }: Props) => {
  const [likes, setLikes] = useState(0);

  const authContext = useAuth();

  return (
    <div className={`panel-item ${type}`} key={index}>
      <span className="panel-item-text">{text}</span>
      <div className="panel-item-like">
        <FontAwesomeIcon
          icon={faHeart}
          title="Like"
          onClick={() => setLikes(likes => likes + 1)}
        />
        <span>{likes}</span>
      </div>
      <div className="panel-item-author">{authContext?.username}</div>
      <FontAwesomeIcon
        icon={faTrash}
        title="Remove"
        onClick={() => onRemove(index)}
        className="remove-icon"
      />
    </div>
  );
};

export default PanelItem;
