import React, { Suspense, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '@interfaces';
import { TProfile } from '@types';
import Router from './Router';

import Header from '../../components/layouts/Header/Header';
import Footer from '../../components/layouts/Footer/Footer';
import { setAuth, setProfile, setMobile } from '../../store/actions';

import './App.css';
import Sidebar from '../../components/layouts/Sidebar/Sidebar';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isMobile } = useSelector((state: IStore) => state.mobile);
  const history = useHistory();
  const handleSignIn = () => history.push('/sign-in');
  const handleSignUp = () => history.push('/sign-up');

  useEffect(() => {
    dispatch(setMobile(window.innerWidth < 768));
    const resizeListener = () => {
      if (window.innerWidth < 768) {
        if (isMobile) return;
        dispatch(setMobile(!isMobile));
      } else {
        if (!isMobile) return;
        dispatch(setMobile(!isMobile));
      }
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [ dispatch, isMobile ]);

  useEffect(() => {
    const User: TProfile = {
      firstName: 'Иван',
      lastName: 'Бризинский',
      avatar: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-9.jpg',
      post: 'Руководитель',
      department: 'департамент PR'
    };

    dispatch(setAuth(true));
    dispatch(setProfile(User));
  }, [ dispatch ]);

  return (
    <div className="app">
      <Suspense fallback={ () => 'Загрузка' }>
        <Header onSignIn={ handleSignIn } onSignUp={ handleSignUp } />
        <section className="content">
          <Sidebar />
          <Router />
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
