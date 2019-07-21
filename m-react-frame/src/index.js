import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './router/index.js';
import { BrowserRouter } from 'react-router-dom';  //路由
import { Provider } from 'react-redux';
import './utils/interceptors.js'
import Store from './store/index.js';
import 'antd/dist/antd.css';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
