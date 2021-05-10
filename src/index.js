import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/material-icons/iconfont/material-icons.css';

const root = document.getElementById('root')

ReactDOM.render(
  <React.StrictMode>
    <App
      height={root.getAttribute('height')}
      width={root.getAttribute('width')} />
  </React.StrictMode>,
  root
);
