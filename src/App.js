// @ts-check
import z from "zod";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LayerLogo from "./LayerLogo.svg";
import { Box, Icon, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme, selectTheme } from "./features/global/globalSlice";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CustomSwitch } from "./components/CustomSwitch";
import Park from "./features/park/park";
import "./App.css";
import { Widget, Invokable } from "@buildwithlayer/sdk";

const sharedPalette = {
  primary: {
    main: "#7b65ff",
    dark: "#4e38d7",
    contrastText: "#f2f2f2",
    light: "#e9dfff",
  },
  secondary: {
    main: "#df85ff",
    dark: "#c243ee",
    contrastText: "#333333",
    light: "#eebeff",
  },
};

const typeography = {
  htmlFontSize: 16,
  fontFamily: ["Manrope"],
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: { fontSize: "2.5rem" },
  h2: { fontSize: "1.5rem" },
  h3: { fontSize: "16px", fontWeight: 700 },
  body1: { fontSize: "1rem" },
  body2: { fontSize: "0.75rem" },
};

const lightTheme = createTheme({
  palette: {
    ...sharedPalette,
    mode: "light",
    background: {
      default: "#ffffff",
      light: "#f2f2f2",
      contrastText: "#333333",
    },
  },
  typography: typeography,
});

const darkTheme = createTheme({
  palette: {
    ...sharedPalette,
    mode: "light",
    background: {
      default: "#333333",
      light: "#4f4f4f",
      contrastText: "#f2f2f2",
    },
  },
  typography: typeography,
});

function App() {
  const dispatch = useDispatch();
  const themeMode = useSelector(selectTheme);

  const playgrounds = [
    "Box Layout",
    "Basic Playground",
    "Fun Playground",
    "Advanced Playground",
  ];

  return (
    <Widget
      openAiApiKey={process.env.REACT_APP_OPEN_AI_API_KEY || ""}
      invokables={[
        new Invokable({
          name: "resetPlayground",
          description: "Resets the playground user is currently viewing",
          func: async ({}) => "something",
          schema: z.object({}),
        }),
      ]}
      layerApiKey={""}
    >
      <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "background.default",
          }}
        >
          <Container
            maxWidth="xl"
            sx={{ backgroundColor: "background.default" }}
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
                  <img src={LayerLogo} alt="Layer Logo" />
                </Icon>
                <Typography
                  component="div"
                  variant="h1"
                  color={"background.contrastText"}
                  sx={{ flexGrow: 1 }}
                >
                  <Box fontWeight="700" display="inline">
                    Layer
                  </Box>{" "}
                  Park
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
              maxHeight: "90vh",
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
