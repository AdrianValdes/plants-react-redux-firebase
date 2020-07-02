import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import { middleware } from './middleware/middleware';
import { Provider } from 'react-redux';

const store = createStore(rootReducer, middleware);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
