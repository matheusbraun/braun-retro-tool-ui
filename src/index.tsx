import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import AuthProvider from './context/Auth';

import './index.css';

const link = new WebSocketLink({
  uri: `wss://braun-retro-tool-api.vercel.app`,
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link,
  uri: 'https://braun-retro-tool-api.vercel.app/',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);
