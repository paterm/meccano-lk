import React from 'react';
import { Switch, Redirect, Route } from 'react-router';

const SignIn = React.lazy(() => import('../../components/views/SignIn/SignIn'));
const Recovery = React.lazy(() => import('../../components/views/Recovery/Recovery'));
const Dashboard = React.lazy(() => import('../../components/views/Dashboard/Dashboard'));
const Messages = React.lazy(() => import('../../components/views/Messages/Message'));

const Router:React.FC = () => (
  <Switch>
    <Route path="/sign-in" component={ SignIn } />
    <Route path="/recovery" component={ Recovery } />
    <Route path="/messages" component={ Messages } />
    <Route path="/" component={ Dashboard } />
    <Redirect exact from="/" to="/sign-in" />
  </Switch>
);

export default Router;
