// @ts-check
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInvokables, FormFillingInvokable } from "@buildwithlayer/sdk";
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

// create a react component called BasicToy that has a square and field image
export function FormFillingPlayground() {
  const { invokables, addInvokable, reset } = useInvokables();
  const dispatch = useDispatch();
  const state = useSelector(selectForm);
  const setValues = useCallback(
    (val) => dispatch(setForm({ ...state, ...val })),
    [dispatch, state]
  );

  useEffect(() => {
    addInvokable(
      new FormFillingInvokable({
        onValues: async (values) => {
          console.log(values);
          setValues(values);
          return "Changed form values successfully.";
        },
      })
    );

    return () => {
      reset(
        invokables.filter(
          (invokable) => !(invokable instanceof FormFillingInvokable)
        )
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}
    >
      <TextField
        id="firstName"
        label="First Name"
        value={state.firstName}
        onChange={(e) => setValues({ ...state, firstName: e.target.value })}
      />
      <TextField
        id="lastName"
        label="Last Name"
        value={state.lastName}
        onChange={(e) => setValues({ ...state, lastName: e.target.value })}
      />
      <TextField
        id="email"
        label="Email"
        value={state.email}
        onChange={(e) => setValues({ ...state, email: e.target.value })}
      />
      <FormControlLabel
        control={
          <Checkbox
            id="consented"
            checked={state.consented}
            onChange={(event) =>
              setValues({ ...state, consented: event.target.checked })
            }
          />
        }
        label="Consent"
      />
      <FormControl>
        <FormLabel>Gender</FormLabel>
        <RadioGroup
          aria-labelledby="status"
          name="status"
          id="status"
          value={state.status}
          onChange={(e) => setValues({ ...state, status: e.target.value })}
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
          onChange={(e) => setValues({ ...state, age: e.target.value })}
        >
          <MenuItem value={"18"}>Eighteen</MenuItem>
          <MenuItem value={"19"}>Nineteen</MenuItem>
          <MenuItem value={"20"}>Twenty</MenuItem>
        </Select>
      </FormControl>
      <select
        id="age"
        value={state.age}
        onChange={(e) => setValues({ ...state, age: e.target.value })}
        hidden
      >
        <option value="18"></option>
        <option value="19"></option>
        <option value="20"></option>
      </select>
    </Box>
  );
}
