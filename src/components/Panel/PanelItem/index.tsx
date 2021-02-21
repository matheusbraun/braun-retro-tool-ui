import React from 'react';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gql, useMutation } from '@apollo/client';

import { PanelType } from '..';
import { useAuth } from '../../../hooks/useAuth';

import './styles.css';

const INCREASE_LIKES = gql`
  mutation($id: String!) {
    increaseLikes(id: $id)
  }
`;

const CHECK_CARD = gql`
  mutation($id: String!) {
    checkCard(id: $id)
  }
`;

type Card = {
  id: string;
  user: string;
  content: string;
  likes: number;
  isChecked: boolean;
};

type Props = {
  card: Card;
  type: PanelType;
  onRemove: (id: string) => void;
};

const PanelItem = ({ card, type, onRemove }: Props) => {
  const authContext = useAuth();

  const [increaseLikes] = useMutation(INCREASE_LIKES);
  const [checkCard] = useMutation(CHECK_CARD);

  return (
    <div className={`panel-item ${type} ${card.isChecked ? 'checked' : ''}`}>
      <div className="panel-item-check">
        <input
          type="checkbox"
          onChange={() => checkCard({ variables: { id: card.id } })}
          checked={card.isChecked}
        />
      </div>
      <div className="panel-item-content">
        <span className="panel-item-text">{card.content}</span>
        <div className="panel-item-like">
          <FontAwesomeIcon
            icon={faHeart}
            title="Like"
            onClick={() => increaseLikes({ variables: { id: card.id } })}
          />
          <span>{card.likes}</span>
        </div>
        <div className="panel-item-author">{card.user}</div>
        {card.user === authContext?.username && (
          <FontAwesomeIcon
            icon={faTrash}
            title="Remove"
            onClick={() => onRemove(card.id)}
            className="remove-icon"
          />
        )}
      </div>
    </div>
  );
};

export default PanelItem;
