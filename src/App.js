// @ts-check
import z from 'zod';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LayerLogo from './LayerLogo.svg';
import LayerLogoWhite from './LayerLogoWhite.svg';
import { Box, Icon, Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleTheme,
  selectTheme,
  RESET_PLAYGROUND,
} from './features/global/globalSlice';
import { ThemeProvider } from '@mui/material/styles';
import { LayerSwitch } from './components/LayerSwitch';
import Park from './features/park/park';
import './App.css';
import { Widget, Invokable } from '@buildwithlayer/sdk';
import { lightTheme, darkTheme } from './app/themes';
import { BasicPlaygroundInvokables } from './playgrounds/basicPlayground/basicPlaygroundInvokables';
import { FormFillerInvokables } from './playgrounds/formFillingPlayground/formFillingInvokables';
import { ApiPlaygroundInvokables } from './playgrounds/apiPlayground/apiPlaygroundInvokables';
import { FilteringPlaygroundInvokables } from './playgrounds/filteringPlayground/filteringPlaygroundInvokables';
import { NavigationPlaygroundInvokables } from './playgrounds/navigationPlayground/navigationPlaygroundInvokables';
import { ProductSearchPlaygroundInvokables } from './playgrounds/productSearchPlayground/productSearchInvokables.js';
import { selectPlaygroundName } from './features/park/parkSlice';

const welcomeMessage = `# Welcome to the Layer Park!
**Version ${process.env.REACT_APP_VERSION}:**
Hey great to see you again (or for the first time).  We've been hard at work
adding new features and fixing bugs.  Here are some of the highlights:
1. **New Playground:** Custom Form Filler (Unstable) - This tool reads the DOM and can fill out
forms for you.  It's still a little buggy but we are working on it!
2. **Chained Actions:** You can now chain actions together with the "and" keyword.  For example:

      - "make bx1 30% height and change picture to tree"

3. **Toys!:** Now you can see all the available invokables in the playground by looking at the
toys tabs.

**Limitations:**
Since this is a beta version there are a few things we don't support now
but are quickly adding we think are important to mention:
- **Manicured Responses**: The responses to actions are occasionally incoheret or make
little sense because they are yet to be post-processed.

**Final Word:**
Have fun playing in our park and keep checking in as it grows! If you are interested in
using our technology in your own app, please check us out at www.buildwithlayer.com!

`;

function App() {
  const dispatch = useDispatch();
  const themeMode = useSelector(selectTheme);
  const selectedPlayground = useSelector(selectPlaygroundName);

  const playgrounds = [
    'Box Layout',
    'Form Filler',
    'API Playground',
    'Filtering Playground',
    'Navigation Playground',
    'Product Search Playground',
  ];

  const playgroundsMap = {
    'Box Layout': BasicPlaygroundInvokables.invokables,
    'Form Filler': FormFillerInvokables.invokables,
    'API Playground': ApiPlaygroundInvokables.invokables,
    'Filtering Playground': FilteringPlaygroundInvokables.invokables,
    'Navigation Playground': NavigationPlaygroundInvokables.invokables,
    'Product Search Playground': ProductSearchPlaygroundInvokables.invokables,
  };

  const activeInvokables = React.useMemo(() => {
    const i = [
      new Invokable({
        name: 'resetPlayground',
        description: 'Resets the playground user is currently viewing',
        func: async () => dispatch({ type: RESET_PLAYGROUND }),
        schema: z.object({}),
      }),
      ...playgroundsMap[selectedPlayground],
    ];

    return i;
    // eslint-disable-next-line
  }, [selectedPlayground]);

  return (
    <Widget
      theme={themeMode}
      openAiApiKey={process.env.REACT_APP_OPEN_AI_API_KEY || ''}
      defaultMessage={welcomeMessage}
      invokables={activeInvokables}
      layerApiKey={''}
      copilot="basic">
      <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
        <Box
          sx={{
            height: '100%',
            maxHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'background.default',
          }}>
          <Container
            maxWidth="xl"
            sx={{
              maxHeight: '84px',
              backgroundColor: 'background.default',
            }}>
            <AppBar
              position="static"
              sx={{
                backgroundColor: 'background.default',
                boxShadow: 0,
                padding: '16px',
                backgroundImage: 'none',
              }}>
              <Toolbar disableGutters>
                <Icon
                  sx={{ height: '60px', width: '60px', paddingRight: '16px' }}>
                  <img
                    src={themeMode === 'light' ? LayerLogo : LayerLogoWhite}
                    alt="Layer Logo"
                  />
                </Icon>
                <Typography
                  component="div"
                  variant="h1"
                  color={'background.contrastText'}
                  fontSize={'24px'}
                  sx={{ flexGrow: 1 }}>
                  <Box fontWeight="700" display="inline">
                    Layer
                  </Box>{' '}
                  Park
                  <Box fontSize={'20px'}>0.2.2</Box>{' '}
                </Typography>

                <LayerSwitch
                  onChange={() => {
                    dispatch(toggleTheme());
                  }}
                />
              </Toolbar>
            </AppBar>
          </Container>

          <Container
            maxWidth="xl"
            sx={{
              display: 'flex',
              flexFlow: 'column',
              flex: '1 1 auto',
              maxHeight: '85vh',
            }}>
            <Park playgrounds={playgrounds} />
          </Container>
        </Box>
      </ThemeProvider>
    </Widget>
  );
}

export default App;
