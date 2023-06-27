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
import { LayerAccordianPrimary, LayerAccordianSummaryPrimary, LayerAccordianSecondary, LayerAccordianSummarySecondary } from "../../components/LayerAccordians";
import { selectTheme } from "../global/globalSlice";
import ToysIcon from '@mui/icons-material/Toys';
import { KonaPlayground } from "../../playgrounds/konaPlayground/konaPlayground";
import { FormFillingPlayground } from "../../playgrounds/formFillingPlayground/formFillingPlayground";
import { FormFillingManuallyPlayground } from "../../playgrounds/formFillingManuallyPlayground/formFillingManuallyPlayground";

function ParkView({ playgrounds }) {
  const dispatch = useDispatch();
  const activePlayground = useSelector(selectPlaygroundName);

  return (
    <Box
      container
      sx={{
        flexGrow: 6,
        display: "grid",
        gridTemplateColumns: "repeat(5, 20%)",
        gridTemplateRows: "repeat(10, 10%)",
        borderRadius: "16px",
        borderColor: "#7b65ff",
        borderWidth: "5px",
        borderStyle: "dashed",
      }}
      spacing={1}
      p={3}
    >
      <Box sx={{ gridArea: "1 / 1 / 2 / 5" }} xs={9} pr={1}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel sx={{
            backgroundColor: "background.default",
            color: "background.contrastText",
            paddingLeft: "2px",
            paddingRight: "2px",
            borderRadius: "4px"
          }} id="playground-select-label">Playground</InputLabel>
          <LayerSelect
            labelId="playground-select-label"
            id="playground-select"
            value={activePlayground}
            label="Playground"
            onChange={(v) => {
              dispatch(setSelectedPlayground(v.target.value));
            }}
          >
            {playgrounds.map((name) => {
              return <MenuItem value={name}>{name}</MenuItem>;
            })}
          </LayerSelect>
        </FormControl>
      </Box>
      <Box xs={3} sx={{ gridArea: "1 / 5 / 2 / 6" }}>
        <Button
          variant="contained"
          sx={{ height: "55px" }}
          onClick={() => dispatch({ type: RESET_PLAYGROUND })}
        >
          Reset Playground
        </Button>
      </Box>

      <Box
        xs={12}
        sx={{
          height: "100%",
          gridArea: "2 / 1 / 11 / 6",
          backgroundColor: "background.light",
          borderRadius: "8px",
        }}
      >
        {activePlayground === "Box Layout" && <BasicPlayground />}
        {activePlayground === "Kona Playground" && <KonaPlayground />}
        {activePlayground === "Form Filling Playground" && (
          <FormFillingPlayground />
        )}
        {activePlayground === "Form Filling Manually Playground" && (
          <FormFillingManuallyPlayground />
        )}
      </Box>
    </Box>
  );
}


function ToysBar() {
  const themeMode = useSelector(selectTheme);


  const toys = [
    {
      name: "Box",
      actions: [
        {
          name: "Change Height",
          description: "Change the height of the box",
        },
        {
          name: "Change Width",
          description: "Change the width of the box",
        },
      ]
    },
    {
      name: "Box",
      actions: [
        {
          name: "Change Height",
          description: "Change the height of the box",
        },
        {
          name: "Change Width",
          description: "Change the width of the box",
        },
      ]
    },
    {
      name: "Box",
      actions: [
        {
          name: "Change Height",
          description: "Change the height of the box",
        },
        {
          name: "Change Width",
          description: "Change the width of the box",
        },
      ]
    },
  ]
  return (

    <Box sx={{
      height: "100%",
      width: "100%",
      backgroundColor: themeMode === "light" ? "primary.light" : "background.light",
      color: "background.contrastText",
      borderRadius: "8px"
    }}>
      <Box pl={2} sx={{
        display: "flex",
        height: "60px",
        alignItems: "center",
        backgroundColor: themeMode === "light" ? "background.light" : "background.light",
        borderRadius: "8px 8px 0px 0px"
      }}>
        <ToysIcon />
        <Typography pl={1} variant="h3">Toys</Typography>
      </Box>
      <Box pl={1} pr={1} sx={{ overflow: "auto" }}>
        {toys.map((toy) => {
          return (
            <LayerAccordianPrimary>
              <LayerAccordianSummaryPrimary>
                <Typography variant="h3">{toy.name}</Typography>
              </LayerAccordianSummaryPrimary>
              <AccordionDetails>
                <Stack spacing={1}>
                  {toy.actions.map((action) => {
                    return (
                      <LayerAccordianSecondary>
                        <LayerAccordianSummarySecondary>
                          <Typography variant="h3">{action.name}</Typography>
                        </LayerAccordianSummarySecondary>
                        <AccordionDetails>
                          <Typography variant="body1">{action.description}</Typography>
                        </AccordionDetails>
                      </LayerAccordianSecondary>
                    )
                  })}
                </Stack>
              </AccordionDetails>
            </LayerAccordianPrimary>
          )
        })}
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
