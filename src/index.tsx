import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

import { Provider } from 'react-redux';
import getStore from './store/store';
import App from './containers/App/App';
import reportWebVitals from './reportWebVitals';
import './assets/fonts/Montserrat/Montserrat.css';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={ queryClient }>
      <Provider store={ getStore }>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
      <ReactQueryDevtools initialIsOpen={ false } />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
