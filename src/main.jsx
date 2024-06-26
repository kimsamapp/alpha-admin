import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import '@fontsource/inter';
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from './redux/app/store'

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
