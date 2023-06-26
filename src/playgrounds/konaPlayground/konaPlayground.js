// @ts-check
import z from "zod";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Invokable, useInvokables } from "@buildwithlayer/sdk";
import { Box, Typography, Tab, Tabs } from "@mui/material";

import {
  selectFilters,
  selectTabIndex,
  setFilters,
  setTabIndex,
} from "./konaPlaygroundSlice";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const TransactionScreen = () => {
  const filters = useSelector(selectFilters);

  return (
    <Box>
      <Typography variant="h3">Transactions</Typography>
      <Typography>Start Date: {JSON.stringify(filters.startDate)}</Typography>
      <Typography>End Date: {JSON.stringify(filters.endDate)}</Typography>
      <Typography>Category: {JSON.stringify(filters.category)}</Typography>
      <Typography>Amount: {JSON.stringify(filters.amount)}</Typography>
    </Box>
  );
};

export const DashboardScreen = () => {
  return (
    <Box>
      <Typography variant="h3">Dashboard</Typography>
      <Typography>Try asking the assistant the following:</Typography>
      <Typography variant="caption">
        Navigate to transactions screen and filter transactions by amount larger
        than 10 and by enddate less than and equal to today
      </Typography>
    </Box>
  );
};

const screens = {
  dashboard: {
    component: <DashboardScreen />,
  },
  transactions: {
    component: <TransactionScreen />,
  },
};

// create a react component called BasicToy that has a square and field image
export function KonaPlayground() {
  const { addInvokable } = useInvokables();
  const dispatch = useDispatch();
  const value = useSelector(selectTabIndex);
  const updateFilters = useCallback(
    (val) => dispatch(setFilters(val)),
    [dispatch]
  );
  const setValue = useCallback(
    (index) => dispatch(setTabIndex(index)),
    [dispatch]
  );

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    addInvokable(
      new Invokable({
        name: "changeScreen",
        description:
          "Navigate to a different screen, the input of the function is the name of the screen such as 'dashboard' or 'transactions'",
        func: async ({ name }) => {
          setValue(Object.keys(screens).indexOf(name));
          return "Changed screen successfully.";
        },
        schema: z.object({ name: z.string().optional() }),
      })
    );
    addInvokable(
      new Invokable({
        name: "filterTransactions",
        description:
          "Filter transactions by start date, end date, category, and amount.",
        func: async ({ startDate, endDate, category, amount }) => {
          updateFilters({ startDate, endDate, category, amount });
          return "Filtered transactions successfully. Don't forget to navigate to the transactions screen.";
        },
        schema: z.object({
          startDate: z.any().optional(),
          endDate: z.any().optional(),
          category: z.any().optional(),
          amount: z.any().optional(),
        }),
      })
    );
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          {Object.entries(screens).map(([key]) => (
            <Tab key={key} label={key} />
          ))}
        </Tabs>
      </Box>
      {Object.entries(screens).map(([key, { component }], index) => (
        <TabPanel value={value} index={index}>
          {component}
        </TabPanel>
      ))}
    </Box>
  );
}
