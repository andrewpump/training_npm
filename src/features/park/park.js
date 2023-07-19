import * as React from "react";
import {
  Stack,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Button,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedPlayground, selectPlaygroundName } from "./parkSlice";
import { RESET_PLAYGROUND } from "../global/globalSlice";
import { BasicPlayground } from "../../playgrounds/basicPlayground/basicPlayground";
import { LayerSelect } from "../../components/LayerSelect";
import {
  LayerAccordianPrimary,
  LayerAccordianSummaryPrimary,
  LayerAccordianSecondary,
  LayerAccordianSummarySecondary,
} from "../../components/LayerAccordians";
import { selectTheme } from "../global/globalSlice";
import ToysIcon from "@mui/icons-material/Toys";
import { KonaPlayground } from "../../playgrounds/konaPlayground/konaPlayground";
import { useInvokables } from "@buildwithlayer/sdk";
import { FilteringPlayground } from "../../playgrounds/filteringPlayground/filteringPlayground";
import { FormFillingPlayground } from "../../playgrounds/formFillingPlayground/formFillingPlayground";
import { FormFillingManuallyPlayground } from "../../playgrounds/formFillingManuallyPlayground/formFillingManuallyPlayground";
import { ApiPlayground } from "../../playgrounds/apiPlayground/apiPlayground";
import { NavigationPlayground } from "../../playgrounds/navigationPlayground/navigationPlayground";

function ParkView({ playgrounds }) {
  const dispatch = useDispatch();
  const activePlayground = useSelector(selectPlaygroundName);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 6,
        borderRadius: "16px",
        borderColor: "#7b65ff",
        borderWidth: "5px",
        borderStyle: "dashed",
      }}
      spacing={1}
      p={3}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          minWidth: "100%",
          minHeight: "64px",
          height: "10%",
        }}
      >
        <Box sx={{ width: "100%" }} xs={9} pr={1}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel
              sx={{
                backgroundColor: "background.default",
                color: "background.contrastText",
                paddingLeft: "2px",
                paddingRight: "2px",
                borderRadius: "4px",
              }}
              id="playground-select-label"
            >
              Playground
            </InputLabel>
            <LayerSelect
              labelId="playground-select-label"
              id="playground-select"
              value={activePlayground}
              label="Playground"
              onChange={(v) => {
                dispatch(setSelectedPlayground(v.target.value));
              }}
            >
              {playgrounds.map((name, index) => {
                return (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                );
              })}
            </LayerSelect>
          </FormControl>
        </Box>
        <Box xs={3} sx={{ gridArea: "1 / 5 / 2 / 6" }}>
          <Button
            variant="contained"
            sx={{
              padding: "16px",
              fontWeight: "600",
              textTransform: "none",
              letterSpacing: "1px",
              whiteSpace: "nowrap",
            }}
            onClick={() => dispatch({ type: RESET_PLAYGROUND })}
          >
            Reset Playground
          </Button>
        </Box>
      </Box>

      <Box
        xs={12}
        sx={{
          height: "100%",
          maxHeight: "85%",
          minHeight: "0",
          marginTop: "16px",
          backgroundColor: "background.light",
          borderRadius: "8px",
        }}
      >
        {activePlayground === "Box Layout" && <BasicPlayground />}
        {activePlayground === "Kona Playground" && <KonaPlayground />}
        {activePlayground === "Form Filler" && <FormFillingPlayground />}
        {activePlayground === "Custom Form Filler" && (
          <FormFillingManuallyPlayground />
        )}
        {activePlayground === "API Playground" && <ApiPlayground />}
        {activePlayground === "Filtering Playground" && <FilteringPlayground />}
        {activePlayground === "Navigation Playground" && (
          <NavigationPlayground />
        )}
      </Box>
    </Box>
  );
}

function ToysBar() {
  const themeMode = useSelector(selectTheme);
  const { invokables } = useInvokables();
  const activePlayground = useSelector(selectPlaygroundName);

  const [toys, setToys] = React.useState({});

  React.useEffect(() => {
    const holder = {};
    invokables.forEach((invokable) => {
      const stringSchema = invokable.description.match(/\[(.*?)\]/);

      if (stringSchema === null) {
        holder[invokable.name] = {
          actions: [],
          description: invokable.description,
        };
      } else {
        const description = invokable.description.substring(
          0,
          invokable.description.indexOf("[")
        );
        const splitSchmea = stringSchema[1].split(",");

        if (
          holder[splitSchmea[1]] === undefined &&
          splitSchmea[1] !== "global"
        ) {
          holder[splitSchmea[1]] = { actions: [], description: "" };
        }

        if (splitSchmea[1] !== "global") {
          holder[splitSchmea[1]].actions.push({
            name: invokable.name,
            description: description,
          });
        } else {
          holder[splitSchmea[0]] = { actions: [], description: description };
        }
      }
    });

    setToys(holder);
  }, [invokables, activePlayground]);

  const generateToys = () => {
    return (
      <>
        {Object.keys(toys).map((key) => {
          return (
            <LayerAccordianPrimary key={key}>
              <LayerAccordianSummaryPrimary>
                <Typography variant="h3">{key}</Typography>
              </LayerAccordianSummaryPrimary>

              <AccordionDetails>
                <Stack spacing={1}>
                  {toys[key].description !== "" ? (
                    <AccordionDetails>
                      <Typography variant="body1">
                        {toys[key].description}
                      </Typography>
                    </AccordionDetails>
                  ) : (
                    <></>
                  )}
                  {toys[key].actions.map((action, index) => {
                    return (
                      <LayerAccordianSecondary key={index}>
                        <LayerAccordianSummarySecondary>
                          <Typography variant="h3">{action.name}</Typography>
                        </LayerAccordianSummarySecondary>
                        <AccordionDetails>
                          <Typography variant="body1">
                            {action.description}
                          </Typography>
                        </AccordionDetails>
                      </LayerAccordianSecondary>
                    );
                  })}
                </Stack>
              </AccordionDetails>
            </LayerAccordianPrimary>
          );
        })}
      </>
    );
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        backgroundColor:
          themeMode === "light" ? "primary.light" : "background.light",
        color: "background.contrastText",
        borderRadius: "8px",
      }}
    >
      <Box
        pl={2}
        sx={{
          display: "flex",
          height: "60px",
          alignItems: "center",
          backgroundColor:
            themeMode === "light" ? "background.light" : "background.light",
          borderRadius: "8px 8px 0px 0px",
        }}
      >
        <ToysIcon />
        <Typography pl={1} variant="h3">
          Toys
        </Typography>
      </Box>
      <Box pl={1} pr={1} sx={{ overflow: "auto" }}>
        {generateToys()}
        {/* <Typography pt={2} variant="h2">Coming Soon!</Typography>
        <Typography pt={1} variant="body1">We are working hard to bring you toys to play with (aka Invokables). Check back soon!</Typography> */}
      </Box>
    </Box>
  );
}

export default function Park({ playgrounds }) {
  return (
    <Stack
      flex
      direction="row"
      spacing={2}
      pt={2}
      sx={{ height: "100%", minHeight: "476px" }}
      mb={2}
    >
      <ParkView playgrounds={playgrounds} sx={{ width: "65%" }} />
      <Box sx={{ flexGrow: 6, display: "flex", width: "35%" }}>
        <ToysBar />
      </Box>
    </Stack>
  );
}
