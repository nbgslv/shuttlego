import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import { ParallaxProvider } from 'react-scroll-parallax';
import store from './store/index';
import App from './containers/App/App';
import AdminContainer from './containers/Admin/AdminContainer';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ParallaxProvider>
        <App />
      </ParallaxProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
