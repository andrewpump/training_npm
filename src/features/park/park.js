import * as React from "react";
import {
  Stack,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedPlayground, selectPlaygroundName } from "./parkSlice";
import { RESET_PLAYGROUND } from "../global/globalSlice";
import { BasicPlayground } from "../../playgrounds/basicPlayground/basicPlayground";
import { KonaPlayground } from "../../playgrounds/konaPlayground/konaPlayground";
import { CustomSelect } from "../../components/CustomSelect";
import { Container } from "@material-ui/core";

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
      mb={2}
    >
      <Box sx={{ gridArea: "1 / 1 / 2 / 5" }} xs={9} pr={1}>
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
            spacing={1}
            p={3}
          >
            Playground
          </InputLabel>
          <CustomSelect
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
          </CustomSelect>
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
      </Box>
    </Box>
  );
}

function ToysBar() {
  return <Box sx={{}}></Box>;
}

export default function Park({ playgrounds }) {
  return (
    <Stack
      flex
      direction="row"
      spacing={2}
      pt={2}
      sx={{ height: "100%" }}
      mb={2}
    >
      <ParkView playgrounds={playgrounds} sx={{ width: "65%" }} />
      <Box
        sx={{
          flexGrow: 6,
          display: "flex",
          width: "35%",
          border: "solid red 2px",
        }}
      >
        <ToysBar />
      </Box>
    </Stack>
  );
}
