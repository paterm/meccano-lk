import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import getStore from './store/store';
import App from './containers/App/App';
import reportWebVitals from './reportWebVitals';

import './assets/fonts/Montserrat/Montserrat.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ getStore }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
