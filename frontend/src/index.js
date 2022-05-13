import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import storage from "redux-persist/lib/storage";
import allReducers from "./store/reducers/allReducers";
import { persistStore, persistReducer } from "redux-persist";
import { compose, createStore } from "redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { BrowserRouter } from 'react-router-dom';

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);

const store = createStore(
  persistedReducer,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const persistor = persistStore(store);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <BrowserRouter><App /></BrowserRouter>
        
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
