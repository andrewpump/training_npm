// @ts-check
import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { JSONTree } from 'react-json-tree';

import { selectFilters } from './filteringPlaygroundSlice';

// create a react component called BasicToy that has a square and field image
export function FilteringPlayground() {
  const filters = useSelector(selectFilters);
  return (
    <Box sx={{ width: '100%', height: '100%', '& ul': { height: '100%' } }}>
      <JSONTree data={filters} />
    </Box>
  );
}
