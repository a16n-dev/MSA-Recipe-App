import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from './theme/theme'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/Authcontext';
import { ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios'
import { CssBaseline } from '@material-ui/core';

// axios.defaults.baseURL = 'https://recipe-app-api.azurewebsites.net';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
