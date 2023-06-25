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
import { CustomSwitch } from "./components/CustomSwitch";
import Park from "./features/park/park";
import "./App.css";
import { Widget, Invokable } from "@buildwithlayer/sdk";
import { lightTheme, darkTheme } from "./app/themes";


const welcomeMessage = `# Welcome to the Layer Park!
**Version 0.1.1:** 
Our park is used as a testing bed for new features we are prototyping.  In this
park there are several different playgrounds each with a set of toys.  Using
the field down below, you can control toys in the playground using regular
human words.  Here are some examples:
- "make bx1 30% height"
- "change picture to tree"

**Current Limitations:**
Since this is a beta version there are a few things we don't support now
but are quickly adding we think are important to mention:
- **Chaining:** At the moment the Layer Agent can only execute one action at a time.
- **Manicured Responses**: The responses to actions are occasionally incoheret or make
little sense because they are yet to be post-processed.

**Final Word:**
Have fun playing in our park and keep checking in as it grows! If you are interested in
using our technology in your own app, please check us out at buildwithlayer.com!

`;

function App() {
  const dispatch = useDispatch();
  const themeMode = useSelector(selectTheme);

  const playgrounds = [
    "Box Layout",
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
              }}
            >
              <Toolbar disableGutters>
                <Icon
                  sx={{ height: "60px", width: "60px", paddingRight: "16px" }}
                >
                  <img src={themeMode === "light" ? LayerLogo : LayerLogoWhite} alt="Layer Logo" />
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
                    0.1.2
                  </Box>{" "}
                </Typography>

                <CustomSwitch
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
