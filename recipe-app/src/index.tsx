import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from './theme/theme'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/Authcontext';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, Grow } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import Axios from 'axios';

if(process.env.NODE_ENV === 'production'){
  Axios.defaults.baseURL=process.env.REACT_APP_API_URL
}


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AuthProvider>
        <SnackbarProvider maxSnack={1} TransitionComponent={Grow}>
          <App />
          </SnackbarProvider>
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
