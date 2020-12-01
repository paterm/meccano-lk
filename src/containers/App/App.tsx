import React, { Suspense } from 'react';
import { useHistory } from 'react-router';
import Router from './Router';

import Header from '../../components/layouts/Header/Header';
import Footer from '../../components/layouts/Footer/Footer';

import './App.css';

const App: React.FC = () => {
  const history = useHistory();
  const handleSignIn = () => history.push('/sign-in');
  const handleSignUp = () => history.push('/sign-up');

  return (
    <div className="app">
      <Suspense fallback={ () => 'Загрузка' }>
        <Header onSignIn={ handleSignIn } onSignUp={ handleSignUp } />
        <section className="content">
          <Router />
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
