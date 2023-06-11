import { Widget, Invokable } from '@buildwithlayer/sdk';
import { useState, useEffect } from 'react';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LayerLogo from './LayerLogo.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Park from './park.js';
import { BasicPlayground } from './playgrounds/basicPlayground';

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

function App() {
  const name = 'John Doe';
  const companyName = 'Acme Company Inc.';

  const playgrounds = [
    BasicPlayground(),
  ]

  const [selectedPlayground, setSelectedPlayground] = useState(playgrounds[0]);

  const sayHello = (name) => {
    return `hello ${name}!`;
  };

  // a use effect that prints the value of the process.env.REACT_APP_OPEN_AI_API_KEY
  useEffect(() => {

  }, []);



  const invokables = [
    new Invokable({
      name: 'sayHello',
      description: `a function that says hello or hi to the name provided to the tool.`,
      func: async (name) => sayHello(name),
    }),
  ];

  const renderHeader = () => (
    <AppBar position="static" sx={{ backgroundColor: "#7A65FF", height: "8vh" }}>
      <Toolbar>
        <div style={{ padding: "6px", paddingRight: "10px" }}>
          <img src={LayerLogo} alt="Layer Logo" style={{ padding: "4px", borderRadius: "10px", backgroundColor: "white" }} />
        </div>

        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Layer Park
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
            <Park
              selectedPlayground={selectedPlayground}
              setSelectedPlayground={setSelectedPlayground}
              playgrounds={playgrounds} />
          </Box>
          <Box sx={{ display: 'flex', flexGrow: 3 }}>
          </Box>
          <Box sx={{ display: 'flex', flexGrow: 3 }}>
        
          </Box>
        </Stack>


      </ThemeProvider>
    </Box >





  );
}

export default App;
