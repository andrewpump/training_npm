// @ts-check
import z from "zod";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Invokable, useInvokables } from "@buildwithlayer/sdk";
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

import { selectForm, setForm } from "./formFillingManuallyPlaygroundSlice";

// create a react component called BasicToy that has a square and field image
export function FormFillingManuallyPlayground() {
  const { addInvokable, removeInvokable } = useInvokables();
  const dispatch = useDispatch();
  const state = useSelector(selectForm);
  const setValues = useCallback(
    (val) => dispatch(setForm({ ...state, ...val })),
    [dispatch, state]
  );

  useEffect(() => {
    addInvokable(
      new Invokable({
        name: "fillForm",
        description:
          "Fill out the form on the page with the given values. Values should be an object with keys corresponding to the id of the input and values corresponding to the value to fill in such as firstName, lastName, email, consented, status, age. [fillFormManual,global]",
        func: async (values) => {
          setValues(values);
          return "Changed form values successfully.";
        },
        schema: z.object({
          firstName: z.string().optional(),
          lastName: z.string().optional(),
          email: z.string().optional(),
          consented: z.boolean().optional(),
          status: z.enum(["available", "busy", "other"]).optional(),
          age: z.string().optional(),
        }),
      })
    );

    return () => {
      removeInvokable("fillForm");
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
    </Box>
  );
}
