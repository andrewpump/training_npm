// @ts-check
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Tab, Tabs } from "@mui/material";

import { selectTabIndex, setTabIndex } from "./navigationPlaygroundSlice";

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

export const TransactionsScreen = () => {
  return (
    <Box>
      <Typography variant="h3">Transactions</Typography>
      <Typography>Try asking the assistant the following:</Typography>
      <Typography variant="caption">
        Navigate to transactions screen and filter transactions by amount larger
        than 10 and by enddate less than and equal to today
      </Typography>
    </Box>
  );
};

export const ReportsScreen = () => {
  return (
    <Box>
      <Typography variant="h3">Reports</Typography>
      <Typography>Try asking the assistant the following:</Typography>
      <Typography variant="caption">
        Navigate to transactions screen and filter transactions by amount larger
        than 10 and by enddate less than and equal to today
      </Typography>
    </Box>
  );
};

export const NotificationsScreen = () => {
  return (
    <Box>
      <Typography variant="h3">Notifications</Typography>
      <Typography>Try asking the assistant the following:</Typography>
      <Typography variant="caption">
        Navigate to transactions screen and filter transactions by amount larger
        than 10 and by enddate less than and equal to today
      </Typography>
    </Box>
  );
};

export const HelpScreen = () => {
  return (
    <Box>
      <Typography variant="h3">Help</Typography>
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
    component: <TransactionsScreen />,
  },
  reports: {
    component: <ReportsScreen />,
  },
  notifications: {
    component: <NotificationsScreen />,
  },
  help: {
    component: <HelpScreen />,
  },
};

// create a react component called BasicToy that has a square and field image
export function NavigationPlayground() {
  const dispatch = useDispatch();
  const value = useSelector(selectTabIndex);
  const setValue = useCallback(
    (index) => dispatch(setTabIndex(index)),
    [dispatch]
  );

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

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
