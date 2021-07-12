import React, { Suspense, useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { TProfile } from '@t';
import Router from './Router';
import PopupRouter from './PopupRouter';
import Header from '../../components/layouts/Header/Header';
import Footer from '../../components/layouts/Footer/Footer';
import Sidebar from '../../components/layouts/Sidebar/Sidebar';
import { setAuth, setProfile } from '../../store/actions';
import { MobileContext } from '../../contexts/MobileContext';
import { useProfileQuery } from '../../queries/userQueries';
import { removeAuthFromStorage } from '../../utils/helpers/authStorage';
import './App.css';

const App: React.FC = () => {
  const [ mobile, setMobile ] = useState({ isMobile: false });
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSignIn = () => history.push('/sign-in');
  const handleSignUp = () => history.push('/sign-up');

  // Считать авторизированным, если удаётся получить профиль пользователя
  const {
    isSuccess: loggedIn,
    isError,
    isLoading,
    error
  } = useProfileQuery({
    // Пути по которым не нужно проверять действительность токена
    pathsWithDisabledQuery: ['/sign-in'],
    retry: 0
  });

  // Если при запросе профиля ошибка связанная с авторизацией, удалять токены их хранилища
  if (isError && (error as any).status === 401) {
    removeAuthFromStorage();
  }

  useEffect(() => {
    setMobile({ isMobile: window.innerWidth < 768 });
    const resizeListener = () => {
      if (window.innerWidth < 768) {
        if (mobile.isMobile) return;
        setMobile({ isMobile: !mobile.isMobile });
      } else {
        if (!mobile.isMobile) return;
        setMobile({ isMobile: !mobile.isMobile });
      }
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [ mobile.isMobile ]);

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

  const Loading = () => <div>Загрузка...</div>;

  return (
    <MobileContext.Provider value={ mobile }>
      <HelmetProvider>
        <div className="app">
          <Suspense fallback={ (<Loading />) }>
            <Header onSignIn={ handleSignIn } onSignUp={ handleSignUp } />
            <section className="content">
              <Sidebar />
              <div className="main">
                <PopupRouter
                  loggedIn={ loggedIn }
                />
                <Router
                  loggedIn={ loggedIn }
                  isLoading={ isLoading }
                />
              </div>
            </section>
            <Footer />
          </Suspense>
        </div>
      </HelmetProvider>
    </MobileContext.Provider>
  );
};

export default App;
