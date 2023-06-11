import { Widget, Invokable } from '@buildwithlayer/sdk';
import { useState } from 'react';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Grid, Stack, Card } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LayerLogo from './LayerLogo.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

  const [color, setColor] = useState("purple");
  const [boxTextColor, setBoxTextColor] = useState("white");
  const [boxSize, setBoxSize] = useState(["100%", "100%"]);
  const [catFacts, setGetCatFacts] = useState(["Ask the widget for some cat facts!"]);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const sayHello = (name) => {
    return `hello ${name}!`;
  };

  const changeBoxColor = (color) => {
    setColor(color);
    // create variabl with # stripped from color
    const colorVal = parseInt(color.substring(1), 16);
    setBoxTextColor(colorVal > 186 ? "black" : "white");
    return "success";
  }

  const changeBoxSize = (size) => {
    setBoxSize([size, size]);
    return "success";
  }

  const getCatFacts = async () => {
    const response = await fetch("https://cat-fact.herokuapp.com/facts");
    const data = await response.json();
    setGetCatFacts(data.map((fact) => fact.text));
    return "success";
  }

  const invokables = [
    new Invokable({
      name: 'sayHello',
      description: `a function that says hello or hi to the name provided to the tool.`,
      func: async (name) => sayHello(name),
    }),
    new Invokable({
      name: 'changeBoxColor',
      description: `a function that takes in a color in hex format and changes the color of the box. Returns "success" if the color was changed successfully.`,
      func: async (color) => changeBoxColor(color),
    }),
    new Invokable({
      name: 'changeBoxSize',
      description: `a function that takes in a percentage size and changes the size of the box. Returns "success" if the size was changed successfully.`,
      func: async (size) => { changeBoxSize(size) }
    }),
    new Invokable({
      name: 'getCatFacts',
      description: `a function that returns a random cat fact and returns "success" if the fact was retrieved successfully.`,
      func: async () => { getCatFacts() }
    }),
  ];

  const renderHeader = () => (
    <AppBar position="static" sx={{ backgroundColor: "#7A65FF", height: "8vh" }}>
      <Toolbar>
        <div style={{ padding: "6px", paddingRight: "10px" }}>
          <img src={LayerLogo} alt="Layer Logo" style={{ padding: "4px", borderRadius: "10px", backgroundColor: "white" }} />
        </div>

        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Layer Park (Version 0.0.1)
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

      <Box sx={{ height: "100%", width: "100%", position: "absolute", zIndex: 10, backgroundColor: "rgba(0,0,0,0.5)", display:(showDisclaimer ? null:"none") }} onClick={() => {setShowDisclaimer(false)}}>
        <Card sx={{
          position: "absolute",
          zIndex: 100,
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          margin: "10%",
          padding: "100px",
        }}>
          <Typography variant="h4" component="div">Disclaimer:</Typography>
          <p>
            Welcome to the Layer park version 0.0.1.  First a warning, this is an extremely unstable version of our product.  We are still working on the core functionality of the product, and as such, there are MANY bugs and issues that we are working through.  We are working hard to get the product to a stable state, but we are not there yet.  If you have any questions, please reach out to us.
          </p>
          <br />
          <br />
          <Typography variant="h4" component="div">Usage:</Typography>
          <p>
            The layer assistant is opened by the buttom in the bottom right hand corner where it says "Open Layer Assistant".  Available commands are:
          </p>
          <Box sx={{ textAlign:"left", maxWidth:"600px", margin:"auto" }}>
            <ul>
              <li>sayHello(name): says hello to the name provided</li>
              <li>changeBoxColor(color): changes the color of the box to the color provided</li>
              <li>changeBoxSize(size): changes the size of the box to the size provided</li>
              <li>getCatFacts(): gets a random cat facts</li>
            </ul>
          </Box>
          <br />
          <br />
          <Typography variant="h6" component="div">Click Anywhere to get rid of this disclaimer</Typography>
        </Card>
      </Box>


      <ThemeProvider theme={theme}>
        {renderHeader()}

        <Stack direction="col" sx={{ height: "100%" }}>
          <Box p={4} sx={{
            display: 'flex',
            flexGrow: 6,
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid grey",
            borderRadius: "10px"
          }} m={4}>
            <Box sx={{ height: "100%", width: "100%" }}>
              <Grid sx={{ height: "100%", width: "100%" }} container spacing={0}>
                <Grid xs={8}>
                  <Box sx={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    color: boxTextColor,
                    backgroundColor: color,
                    border: "2px dotted grey",
                    borderRadius: "10px",
                    height: boxSize[0],
                    width: boxSize[1]
                  }}>
                    <Typography variant="h4" component="div" sx={{ margin: "auto" }}>
                      Magic Box
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={4}>
                  <Box sx={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    padding: "10px",
                    maxWidth: "400px"
                  }}>
                    <Stack>
                      <Typography variant="h6" component="div" sx={{ margin: "auto" }}>Cat Facts</Typography>
                      <ul>
                        {catFacts.map((fact) => {
                          return <li>{fact}</li>
                        })}
                      </ul>
                    </Stack>
                  </Box>

                </Grid>
                <Grid xs={4}>
                </Grid>
                <Grid xs={8}>
                </Grid>
              </Grid>
            </Box>
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
