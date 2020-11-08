import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }: RouteProps) => {
  const authContext = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authContext?.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{ state: { from: location.pathname }, pathname: '/login' }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
