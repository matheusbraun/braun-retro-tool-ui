import React, { memo } from 'react';
import { Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Login from '../../pages/Login';
import Session from '../../pages/Session';
import Dashboard from '../../pages/Dashboard';

const Routes = () => (
  <>
    <PrivateRoute exact path="/">
      <Dashboard />
    </PrivateRoute>
    <PrivateRoute path="/session/:sessionid">
      <Session />
    </PrivateRoute>
    <Route path="/login" component={Login} />
  </>
);

export default memo(Routes);
