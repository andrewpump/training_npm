// @ts-check
import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { selectForm, setForm } from "./formFillingPlaygroundSlice";
import { useGlobalInvokables } from "../../hooks";
import { useInvokables, FormFillingInvokable } from "@buildwithlayer/sdk";

// create a react component called BasicToy that has a square and field image
export function FormFillingPlayground() {
  const state = useSelector(selectForm);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        color: "background.contrastText",
      }}
    >
      <TextField id="firstName" label="First Name" value={state.firstName} />
      <TextField id="lastName" label="Last Name" value={state.lastName} />
      <TextField id="email" label="Email" value={state.email} />
      <FormControlLabel
        control={<Checkbox id="consented" checked={state.consented} />}
        label="Consent"
      />
      <FormControl>
        <FormLabel>Gender</FormLabel>
        <RadioGroup
          aria-labelledby="status"
          name="status"
          id="status"
          value={state.status}
        >
          <FormControlLabel
            value="available"
            control={<Radio />}
            label="Available"
          />
          <FormControlLabel value="busy" control={<Radio />} label="Busy" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
      <input
        type="radio"
        id="status-available"
        name="status"
        value="available"
        hidden
      />
      <input type="radio" id="status-busy" name="status" value="busy" hidden />
      <input
        type="radio"
        id="status-other"
        name="status"
        value="other"
        hidden
      />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={state.age}
          label="Age"
        >
          <MenuItem value={"18"}>Eighteen</MenuItem>
          <MenuItem value={"19"}>Nineteen</MenuItem>
          <MenuItem value={"20"}>Twenty</MenuItem>
        </Select>
      </FormControl>
      <select id="age" value={state.age} hidden>
        <option value="18"></option>
        <option value="19"></option>
        <option value="20"></option>
      </select>
    </Box>
  );
}
