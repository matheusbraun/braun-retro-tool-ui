import React, { memo } from 'react';
import { gql, useMutation, useSubscription } from '@apollo/client';

import Panel, { PanelType } from '../../components/Panel';

import './styles.css';
import { useAuth } from '../../hooks/useAuth';

const GET_CARDS = gql`
  subscription {
    cards {
      id
      content
      user
      type
      likes
    }
  }
`;

const POST_CARD = gql`
  mutation($user: String!, $content: String!, $type: String!) {
    postCard(user: $user, content: $content, type: $type)
  }
`;

const DELETE_CARD = gql`
  mutation($id: String!) {
    deleteCard(id: $id)
  }
`;

const Session: React.FC = () => {
  const authContext = useAuth();

  const { data } = useSubscription<{
    cards: Array<{ id: string; user: string; type: string; likes: number }>;
  }>(GET_CARDS);

  const [postCard] = useMutation(POST_CARD);
  const [deleteCard] = useMutation(DELETE_CARD);

  const goodData = data?.cards?.filter(card => card.type === 'good')?.reverse();
  const wonderingData = data?.cards
    ?.filter(card => card.type === 'wondering')
    ?.reverse();
  const badData = data?.cards?.filter(card => card.type === 'bad')?.reverse();

  const handleSubmit = (type: PanelType, value: string) => {
    postCard({
      variables: { user: authContext?.username, content: value, type },
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
