// @ts-check
import z from "zod";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LayerLogo from "./LayerLogo.svg";
import LayerLogoWhite from "./LayerLogoWhite.svg";
import { Box, Icon, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleTheme,
  selectTheme,
  RESET_PLAYGROUND,
} from "./features/global/globalSlice";
import { ThemeProvider } from "@mui/material/styles";
import { LayerSwitch } from "./components/LayerSwitch";
import Park from "./features/park/park";
import "./App.css";
import { Widget, Invokable } from "@buildwithlayer/sdk";
import { lightTheme, darkTheme } from "./app/themes";

const welcomeMessage = `# Welcome to the Layer Park!
**Version 0.2.0:** 
Hey great to see you again (or for the first time).  We've been hard at work
adding new features and fixing bugs.  Here are some of the highlights:
1. **New Playground:** Form Filler (Unstable) - This tool reads the DOM and can fill out
forms for you.  It's still a little buggy but we are working on it!
2. **Chained Actions:** You can now chain actions together with the "and" keyword.  For example:

      - "make bx1 30% height and change picture to tree"

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

  const playgrounds = [
    "Box Layout",
    // "Kona Playground",
    "Form Filler",
    // "Form Filling Manually Playground",
  ];

  return (
    <Widget
      theme={themeMode}
      openAiApiKey={process.env.REACT_APP_OPEN_AI_API_KEY || ""}
      defaultMessage={welcomeMessage}
      invokables={[
        new Invokable({
          name: "resetPlayground",
          description: "Resets the playground user is currently viewing",
          func: async () => dispatch({ type: RESET_PLAYGROUND }),
          schema: z.object({}),
        }),
      ]}
      layerApiKey={""}
    >
      <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
        <Box
          sx={{
            height: "100%",
            maxHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "background.default",
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              maxHeight: "84px",
              backgroundColor: "background.default",
            }}
          >
            <AppBar
              position="static"
              sx={{
                backgroundColor: "background.default",
                boxShadow: 0,
                padding: "16px",
                backgroundImage: "none",
              }}
            >
              <Toolbar disableGutters >
                <Icon
                  sx={{ height: "60px", width: "60px", paddingRight: "16px" }}
                >
                  <img
                    src={themeMode === "light" ? LayerLogo : LayerLogoWhite}
                    alt="Layer Logo"
                  />
                </Icon>
                <Typography
                  component="div"
                  variant="h1"
                  color={"background.contrastText"}
                  fontSize={"24px"}
                  sx={{ flexGrow: 1 }}
                >
                  <Box fontWeight="700" display="inline">
                    Layer
                  </Box>{" "}
                  Park
                  <Box fontSize={"20px"}>
                    0.2.0
                  </Box>{" "}
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
              display: "flex",
              flexFlow: "column",
              flex: "1 1 auto",
              maxHeight: "85vh",
            }}
          >
            <Park playgrounds={playgrounds} />
          </Container>
        </Box>
      </ThemeProvider>
    </Widget>
  );
}

export default App;
