import React, { Suspense, useEffect } from 'react';
import { useHistory } from 'react-router';
import Router from './Router';

import Header from '../../components/layouts/Header/Header';
import Footer from '../../components/layouts/Footer/Footer';
import { setAuth, setProfile } from '../../store/actions';

import './App.css';

const App: React.FC = () => {
  const history = useHistory();
  const handleSignIn = () => history.push('/sign-in');
  const handleSignUp = () => history.push('/sign-up');

  useEffect(() => {
    const user = {
      firstName: 'Иван',
      lastName: 'Бризинский',
      avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.phpfoxer.com%2Fproducts-and-services%2Fphpfox-default-avatar&psig=AOvVaw3nyiaWO2Za8bDp9nKdNJuG&ust=1606999022055000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOCToYKor-0CFQAAAAAdAAAAABAD'
    };

    setProfile(user);
    setAuth({ loggedIn: true });
  }, []);

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
