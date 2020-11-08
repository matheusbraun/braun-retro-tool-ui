import React, { useState, useEffect, memo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Input from '../../components/Input';

import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const authContext = useAuth();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (authContext?.isAuthenticated) history.replace('/');
  }, [authContext?.isAuthenticated, history]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setUsername(value);
  };

  const logIn = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await logIn();

      authContext?.setIsAuthenticated();
      authContext?.setNewUsername(username);

      const { from } = (location.state as any) || { from: '/' };

      history.replace(from === '/login' ? '/' : from);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    <Container>
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
        <Input
          placeholder="Enter your name"
          name="username"
          disabled={loading}
          onChangeCallback={handleOnChange}
          value={username}
          required
        />
        {error && <span className="error-message">{error}</span>}
        <Button type="submit" disabled={loading} title="Enter" />
      </form>
    </Container>
  );
};

export default memo(Login);
