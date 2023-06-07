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
import Grid from '@mui/material/Grid';

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


  const sayHello = (name) => {
    return `hello ${name}!`;
  };

  // create hook to manage color
  const [color, setColor] = useState('red');
  const [text, setText] = useState('Default Text');

  const invokables = [
    new Invokable({
      name: 'sayHello',
      description: `a function that says hello or hi to the name provided to the tool.`,
      func: async (name) => sayHello(name),
    }),
    new Invokable({
      name: 'setColor',
      description: `changes the color of a block on the screen to the color provided to the tool and converts any color to hex before using it.`,
      func: async (name) => setColor(name),
    }),
    new Invokable({
      name: 'setText',
      description: `changes the text of a block on the screen to the text provided to the tool.`,
      func: async (name) => setText(name),
    }),
  ];

  const renderHeader = () => (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div style={{ padding: "6px", paddingRight: "10px" }}>
            <img src={LayerLogo} alt="Layer Logo" style={{ padding: "4px", borderRadius: "10px", backgroundColor: "white" }} />
          </div>

          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Layer Training Application
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <div>
        {renderHeader()}
        <div style={{marginLeft: "100px", marginTop: "100px", height: "100px", width: "100px", backgroundColor: color}}>
          
        </div>
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
      </div>
    </ThemeProvider>

  );
}

export default App;
