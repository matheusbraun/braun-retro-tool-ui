import React from 'react';
import { Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Login from '../../pages/Login';
import Room from '../../pages/Room';

const Routes = () => (
  <>
    <PrivateRoute exact path="/">
      <Room />
    </PrivateRoute>
    <Route path="/login" component={Login} />
  </>
);

export default Routes;
