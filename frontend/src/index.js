import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import init from './init.jsx';

const app = async () => {
  const socket = io();
  const vdom = await init(socket);
  ReactDOM.render(<React.StrictMode>{vdom}</React.StrictMode>, document.getElementById('root'));
};

app();
