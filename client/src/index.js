/** @format */

import React from 'react';
import { createRoot } from 'react-dom/client';
// import { store } from './app/store';
import App from './App';
import './index.css';
// import { AuthProvider } from './screens/context/AuthProvider';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <AuthProvider> */}
      <App />
      {/* </AuthProvider> */}
    </Provider>
  </React.StrictMode>
);
