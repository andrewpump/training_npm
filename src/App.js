import { Invokable } from '@buildwithlayer/sdk';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LayerLogo from './LayerLogo.svg';
import { Box } from '@mui/material';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme, selectTheme } from './features/global/globalSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';



function App() {
  const name = 'John Doe';
  const companyName = 'Acme Company Inc.';

  const dispatch = useDispatch()
  const themeMode = useSelector(selectTheme)
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


  const playgrounds = [
    "Box Layout",
    "Basic Playground",
    "Fun Playground",
    "Advanced Playground",
  ]

  const sayHello = (name) => {
    return `hello ${name}!`;
  };

  const invokables = [
    new Invokable({
      name: 'sayHello',
      description: `a function that says hello or hi to the name provided to the tool.`,
      func: async (name) => sayHello(name),
    }),
  ];

  return (
    <ThemeProvider theme={theme}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
            Layer Park
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ border: "2px solid green", display: "flex", flexDirection: "column", backgroundColor: "background.light" }}>
        <Typography variant="h5" component="div" sx={{ flexGrow: 12 }}>
          Layer Park
        </Typography>
        <Button variant="contained" color="primary" onClick={() => { console.log(theme); dispatch(toggleTheme()) }}>
          Change Theme
        </Button>
      </Box>
    </ThemeProvider >

  );
}

export default App;
