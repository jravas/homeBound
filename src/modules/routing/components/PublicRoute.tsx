import * as React from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { ApplicationState } from 'modules/redux-store';
import { getUserData } from 'modules/user';

const PublicRoute = (props: RouteProps) => {
  const user = useSelector((state: ApplicationState) => getUserData()(state));

  return isEmpty(user.userData) ? <Route {...props} /> : <Redirect to="/" />;
};

export { PublicRoute };
