import React, { Suspense, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import Router from './Router';

import Header from '../../components/layouts/Header/Header';
import Footer from '../../components/layouts/Footer/Footer';
import { setAuth, setProfile } from '../../store/actions';

import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSignIn = () => history.push('/sign-in');
  const handleSignUp = () => history.push('/sign-up');

  useEffect(() => {
    const user = {
      firstName: 'Иван',
      lastName: 'Бризинский',
      avatar: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-9.jpg'
    };

    dispatch(setAuth(true));
    dispatch(setProfile(user));
  }, [ dispatch ]);

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
