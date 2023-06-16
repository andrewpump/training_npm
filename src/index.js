import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './app/store'
import { selectTheme } from './features/global/globalSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';

var themeMode = store.dispatch(selectTheme)

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7b65ff',
      dark: '#4e38d7',
      contrastText: '#f2f2f2',
      light: '#e9dfff',
    },
    secondary: {
      main: '#df85ff',
      dark: '#c243ee',
      contrastText: '#333333',
      light: '#eebeff',
    },
    background: {
      default: '#ffffff',
      light: '#f2f2f2',
      contrastText: '#333333',
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#7b65ff',
      dark: '#4e38d7',
      contrastText: '#f2f2f2',
      light: '#e9dfff',
    },
    secondary: {
      main: '#df85ff',
      dark: '#c243ee',
      contrastText: '#333333',
      light: '#eebeff',
    },
    background: {
      default: '#ffffff',
      light: '#f2f2f2',
      contrastText: '#333333',
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: ['Manrope'],
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
