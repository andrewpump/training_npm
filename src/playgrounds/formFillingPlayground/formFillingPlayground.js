// @ts-check
import z from "zod";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Invokable, useInvokables } from "@buildwithlayer/sdk";
import { Box, TextField } from "@mui/material";

import { selectForm, setForm } from "./formFillingPlaygroundSlice";

// create a react component called BasicToy that has a square and field image
export function FormFillingPlayground() {
  const { addInvokable } = useInvokables();
  const dispatch = useDispatch();
  const state = useSelector(selectForm);
  const setValues = useCallback((val) => dispatch(setForm(val)), [dispatch]);

  useEffect(() => {
    // addInvokable(
    //   new Invokable({
    //     name: "fillForm",
    //     description:
    //       "Fill out the form on the page with the given values. Values should be an object with keys corresponding to the id of the input and values corresponding to the value to fill in such as firstName, lastName, email.",
    //     func: async (values) => {
    //       setValues(values);
    //       return "Changed form values successfully.";
    //     },
    //     schema: z.object({
    //       firstName: z.string().optional(),
    //       lastName: z.string().optional(),
    //       email: z.string().optional(),
    //     }),
    //   })
    // );
    const schema = {};
    document
      .querySelectorAll("form input")
      .forEach((el) => (schema[el.id] = z.string().optional()));

    addInvokable(
      new Invokable({
        name: "fillForm",
        description: `Fill out the form on the page with the given values. Values should be an object with keys corresponding to the id of the input and values corresponding to the value to fill in such as ${Object.keys(
          schema
        ).join(", ")}.`,
        func: async (values) => {
          setValues(values);
          return "Changed form values successfully.";
        },
        schema: z.object({ ...schema }),
      })
    );
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
    </Box>
  );
}
