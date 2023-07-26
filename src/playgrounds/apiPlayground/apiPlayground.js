// @ts-check
import React from 'react';
import { Box } from '@mui/material';
import { JSONTree } from 'react-json-tree';

import { selectResponse } from './apiPlaygroundSlice';
import { useSelector } from 'react-redux';

// create a react component called BasicToy that has a square and field image
export function ApiPlayground() {
  const response = useSelector(selectResponse);
  return (
    <Box sx={{ width: '100%', height: '100%', '& ul': { height: '100%' } }}>
      <JSONTree data={response} />
    </Box>
  );
}
