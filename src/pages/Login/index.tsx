import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// import { logIn } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
// import './styles.css';

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const authContext = useAuth();
  const history = useHistory();
  const location = useLocation();

  // useEffect(() => {
  //   if (authContext?.isAuthenticated) history.replace('/');
  // }, [authContext?.isAuthenticated, history]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
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

      const { from } = (location.state as any) || { from: '/' };

      history.replace(from === '/login' ? '/' : from);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    // <Container>
    <>
      <h1 className="login-form-title">Acessar o sistema</h1>
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
        <input
          // label="Usuário"
          name="username"
          disabled={loading}
          onChange={handleOnChange}
          value={user.username}
          required={true}
        />
        <input
          // label="Senha"
          name="password"
          type="password"
          disabled={loading}
          onChange={handleOnChange}
          value={user.password}
          required={true}
        />
        {error && <span className="error-message">{error}</span>}
        <button type="submit" disabled={loading}>
          Entrar
        </button>
      </form>
    </>
    // </Container>
  );
};

export default Login;
