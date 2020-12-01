import React from 'react';
import { Switch, Redirect, Route } from 'react-router';

const SignIn = React.lazy(() => import('../../components/views/SignIn/SignIn'));
const SignUp = React.lazy(() => import('../../components/views/SignUp/SignUp'));
const Dashboard = React.lazy(() => import('../../components/views/Dashboard/Dashboard'));

const Router:React.FC = () => (
  <Switch>
    <Route path="/sign-in" component={ SignIn } />
    <Route path="/sign-up" component={ SignUp } />
    <Route path="/" component={ Dashboard } />
    <Redirect exact from="/" to="/sign-in" />
  </Switch>
);

export default Router;
