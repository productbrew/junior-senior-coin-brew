import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import { createClient, Provider } from 'urql';

import 'antd/dist/antd.css';

const client = createClient({
  url: 'http://localhost:3000/graphql',
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider value={client}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
