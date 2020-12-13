import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import { AuthProvider } from './app/authContext';

import 'antd/dist/antd.css';
import { UrqlProvider } from './app/urqlClient';

ReactDOM.render(
  <BrowserRouter>
    <UrqlProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </UrqlProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
