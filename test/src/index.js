import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import Store from './store/index.js'
import Routers from './router/index.js';
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import './utils/interceptors.js'
import 'antd/dist/antd.css'
import './index.css';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <LocaleProvider locale={zh_CN}>
        <Routers/>
      </LocaleProvider>
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
