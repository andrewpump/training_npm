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
import { FormFillingPlayground } from "../../playgrounds/formFillingPlayground/formFillingPlayground";
import { FormFillingManuallyPlayground } from "../../playgrounds/formFillingManuallyPlayground/formFillingManuallyPlayground";
import { CustomSelect } from "../../components/CustomSelect";

function ParkView({ playgrounds }) {
  const dispatch = useDispatch();
  const activePlayground = useSelector(selectPlaygroundName);

  return (
    <Box
      container
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
        <Box sx={{ width: "100%", marginRight: "16px" }}>
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
        <Box>
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
  return <Box sx={{}}></Box>;
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
      <Box
        sx={{
          flexGrow: 6,
          display: "flex",
          width: "35%",
        }}
      >
        <ToysBar />
      </Box>
    </Stack>
  );
}
