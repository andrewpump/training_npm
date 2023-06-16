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



function App() {
  const name = 'John Doe';
  const companyName = 'Acme Company Inc.';

  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

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
    <>
      <AppBar position='static'>
        <Toolbar>

          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Layer Park
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ border: "2px solid green", display: "flex", flexDirection: "column", backgroundColor:"background.light" }}>
        <Typography variant="h5" component="div" sx={{ flexGrow: 12 }}>
          Layer Park
        </Typography>
        <Button variant="contained" color="primary" onClick={() => { console.log(theme); dispatch(toggleTheme()) }}>
          Change Theme
        </Button>
      </Box>
    </>

  );
}

export default App;
