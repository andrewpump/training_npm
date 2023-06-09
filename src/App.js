import { Widget, Invokable } from '@buildwithlayer/sdk';
import { useState } from 'react';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LayerLogo from './LayerLogo.svg';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Card, Container } from '@mui/material';
import { Grid } from '@material-ui/core';
import Playground from './playground.js';

const theme = createTheme({
  palette: {
    primary: {
      light: '#EDB1FF',
      main: '#7A65FF',
      dark: '#7069FF',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  const name = 'John Doe';
  const companyName = 'Acme Company Inc.';
  
  const [selectedToy, setSelectedToy] = useState("Basic");

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

  const renderHeader = () => (
    <AppBar position="static" sx={{ backgroundColor: "", height: "8vh" }}>
      <Toolbar>
        <div style={{ padding: "6px", paddingRight: "10px" }}>
          <img src={LayerLogo} alt="Layer Logo" style={{ padding: "4px", borderRadius: "10px", backgroundColor: "white" }} />
        </div>

        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Layer Playground
        </Typography>
      </Toolbar>
    </AppBar>
  );

  return (

    <Box sx={{ height: "91.5vh" }}>
      <Widget
        openAiApiKey={process.env.REACT_APP_OPEN_AI_API_KEY}
        layerApiKey={process.env.REACT_APP_LAYER_API_KEY}
        invokables={invokables}
        // Optional title for the header
        title={"Layer Agent"}
        // Optional function to render a logo in the header
        renderLogo={() => <p>Logo</p>}
        // Optional function to render a custom fab
        renderFab={(onClick) => (
          <button onClick={onClick}>Open Layer Assistant</button>
        )}
        // Optional string to override the default message in the chat
        defaultMessage={`Hey there ${name}! Thanks for choosing ${companyName}! Ask me anything at all, and I will do it!`}
        // Optional theme overrides
        themeOverrides={{
          palette: {
            primary: {
              main: '#7A65FF',
            },
            secondary: {
              main: '#FFFFFF',
            },
          },
        }}
      />

      <ThemeProvider theme={theme}>
        {renderHeader()}

        <Stack direction="col" sx={{ height: "100%" }}>
          <Box p={4} sx={{ display: 'flex', flexGrow: 6, justifyContent: "center", alignItems: "center" }}>
            <Playground selectedToy={selectedToy} setSelectedToy={setSelectedToy} toys={["Basic", "Form"]} />
          </Box>
          <Box sx={{ display: 'flex', flexGrow: 4 }}>

          </Box>
          <Box sx={{ display: 'flex', flexGrow: 2 }}>

          </Box>
        </Stack>


      </ThemeProvider>
    </Box >





  );
}

export default App;
