import React, { memo, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import Container from '../../components/Container';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';

// import { Container } from './styles';

const Dashboard: React.FC = () => {
  const [roomName, setRoomName] = useState('');
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    window.localStorage.setItem('braunretrotool:roomname', roomName);
  }, [roomName]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      setTimeout(() => {
        const roomid = uuid();

        history.push(`/session/${roomid}`);
      }, 500);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Container>
      <form
        className="create-room-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Input
          placeholder="Room name"
          name="username"
          disabled={loading}
          onChange={handleOnChange}
          value={roomName}
          required
        />
        {error && <span className="error-message">{error}</span>}
        <Button type="submit" disabled={loading} title="Create Room" />
      </form>
    </Container>
  );
};

export default memo(Dashboard);
