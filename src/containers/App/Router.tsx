import React from 'react';
import { Switch, Redirect, Route } from 'react-router';

const SignIn = React.lazy(() => import('../../components/views/SignIn/SignIn'));
const Recovery = React.lazy(() => import('../../components/views/Recovery/Recovery'));
const Dashboard = React.lazy(() => import('../../components/views/Dashboard/Dashboard'));
const Messages = React.lazy(() => import('../../components/views/Messages/Messages'));
const Analytics = React.lazy(() => import('../../components/views/Analytics/Analytics'));

interface IRouter {
  loggedIn: boolean
  isLoading: boolean
}

const Router: React.FC<IRouter> = ({ loggedIn, isLoading }) => {
  if (isLoading) {
    return null
  }

  // Роуты с авторизацией
  if (loggedIn) {
    return (
      <Switch>
        <Route path="/recovery" component={ Recovery } />
        <Route path="/messages" component={ Messages } />

        <Route path="/analytics/:type?" component={ Analytics } />

        <Route path="/" exact component={ Dashboard } />
        <Route path="*"><Redirect to="/" /></Route>
      </Switch>
    )
  }

  // Роуты доступные без авторизации
  return (
    <Switch>
      <Route path="/sign-in" component={ SignIn } />
      <Route path="*"><Redirect to="/sign-in" /></Route>
    </Switch>
  );
};

export default Router;
