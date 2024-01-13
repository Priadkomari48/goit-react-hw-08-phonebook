import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'components/App';
import './index.css';

import { store, persistor } from "redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename='/goit-react-hw-08-phonebook'>
        <PersistGate loading={<h2>Restoring last session...</h2>} persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>     
    </Provider>
  </React.StrictMode>
);
