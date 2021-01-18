import React, { memo } from 'react';
import { gql, useMutation, useSubscription } from '@apollo/client';
import { useParams } from 'react-router-dom';

import Panel, { PanelType } from '../../components/Panel';
import { useAuth } from '../../hooks/useAuth';

import './styles.css';

const GET_CARDS = gql`
  subscription($roomId: String!) {
    cards(roomId: $roomId) {
      id
      content
      user
      type
      likes
      roomId
    }
  }
`;

const POST_CARD = gql`
  mutation(
    $user: String!
    $content: String!
    $type: String!
    $roomId: String!
  ) {
    postCard(user: $user, content: $content, type: $type, roomId: $roomId)
  }
`;

const DELETE_CARD = gql`
  mutation($id: String!) {
    deleteCard(id: $id)
  }
`;

type Param = {
  sessionid: string;
};

const Session = () => {
  const authContext = useAuth();

  const { sessionid: roomId } = useParams<Param>();

  const { data } = useSubscription<{
    cards: Array<{
      id: string;
      user: string;
      type: string;
      likes: number;
      roomId: string;
    }>;
  }>(GET_CARDS, { variables: { roomId } });

  const [postCard] = useMutation(POST_CARD);
  const [deleteCard] = useMutation(DELETE_CARD);

  const cardsFilteredByRoomId = data?.cards?.filter(
    card => card.roomId === roomId,
  );

  const goodData = cardsFilteredByRoomId
    ?.filter(card => card.type === 'good')
    ?.reverse();
  const wonderingData = cardsFilteredByRoomId
    ?.filter(card => card.type === 'wondering')
    ?.reverse();
  const badData = cardsFilteredByRoomId
    ?.filter(card => card.type === 'bad')
    ?.reverse();

  const handleSubmit = (type: PanelType, value: string) => {
    postCard({
      variables: { user: authContext?.username, content: value, type, roomId },
    });
  };

  const handleRemove = (id: string) => {
    deleteCard({ variables: { id } });
  };

  return (
    <div className="session">
      {/* REMOVING TIMER FOR NOW
      <div className="session-header">
        <Timer />
      </div>
      <div className="divider" /> */}
      <div className="session-panels">
        <Panel
          type="good"
          onSubmit={(value: string) => handleSubmit('good', value)}
          onRemove={(id: string) => handleRemove(id)}
          panelItems={goodData}
        />
        <Panel
          type="wondering"
          onSubmit={(value: string) => handleSubmit('wondering', value)}
          onRemove={(id: string) => handleRemove(id)}
          panelItems={wonderingData}
        />
        <Panel
          type="bad"
          onSubmit={(value: string) => handleSubmit('bad', value)}
          onRemove={(id: string) => handleRemove(id)}
          panelItems={badData}
        />
      </div>
    </div>
  );
};

export default memo(Session);
