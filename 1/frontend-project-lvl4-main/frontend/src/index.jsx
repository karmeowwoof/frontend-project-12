import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './index.css';

import store from './slices/index.js';
import init from './init.jsx';

const app = async () => {
  const mountNode = document.getElementById('root');
  const root = ReactDOM.createRoot(mountNode);
  const vdom = await init();
  root.render(
    <React.StrictMode>
      <Provider store={store}>{vdom}</Provider>
    </React.StrictMode>
  );
};

app();
