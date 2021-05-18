import React from 'react';
import { Switch, Redirect, Route } from 'react-router';

const SignIn = React.lazy(() => import('../../components/views/SignIn/SignIn'));
const Recovery = React.lazy(() => import('../../components/views/Recovery/Recovery'));
const Dashboard = React.lazy(() => import('../../components/views/Dashboard/Dashboard'));
const Projects = React.lazy(() => import('../../components/views/Projects/Projects'));
const Messages = React.lazy(() => import('../../components/views/Messages/Messages'));
const Analytics = React.lazy(() => import('../../components/views/Analytics/Analytics'));

const Router:React.FC = () => (
  <Switch>
    <Route path="/sign-in" component={ SignIn } />
    <Route path="/recovery" component={ Recovery } />
    <Route path="/projects" component={ Projects } />
    <Route path="/messages" component={ Messages } />

    <Route path="/analytics/:type?" component={ Analytics } />

    <Route path="/" component={ Dashboard } />
    <Redirect exact from="/" to="/sign-in" />
  </Switch>
);

export default Router;
