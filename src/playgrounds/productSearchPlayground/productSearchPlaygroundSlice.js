// @ts-check
import { createSlice } from '@reduxjs/toolkit';

import { resetPlayground } from '../../features/global/globalSlice';
import data from './assets/sample.json';

export const initialState = {
  start: 0,
  selected: null,
  topReccomendations: [],
};

export const ProductSearchPlaygroundSlice = createSlice({
  name: 'productSearchPlayground',
  initialState,
  reducers: {
    generateTopRecs: state => {
      state.topReccomendations = data
        .slice(state.start, state.start + 5)
        .map(item => {
          return {
            title: item.policy_action,
            description: `${item.product_code_description} - ${item.product_code}`,
            raw: item,
          };
        });
      state.start += 5;
    },
    extraReducers: builder => {
      builder.addCase(resetPlayground, () => initialState);
    },
  },
});

// Action creators
export const { generateTopRecs } = ProductSearchPlaygroundSlice.actions;

// Selectors
export const selectTopRecs = state =>
  state.productSearchPlayground.topReccomendations;

export const getInsightFromSKU = async payload => {
  var item = data.find(item => {
    return item.product_code === payload.sku;
  });

  const d = {
    ...item,
  };

  delete d['policy_detail'];
  delete d['policy_action'];

  const justification = `Provide a concise and data-based two sentence justification for 
    the policy_action: ${
      item.policy_action
    }, from the following JSON data provided about the product.  Product data: ${JSON.stringify(
    d,
  )}`;

  return item ? justification : 'Item not found';
};

export const getInsightFromProductName = async payload => {
  var item = data.find(item => {
    return item.product_code_description
      .toLowerCase()
      .includes(payload.product_name.toLowerCase());
  });

  delete item['policy_detail'];

  const justification = `Provide a concise and data-based two sentence justification for 
    the policy_action, ${
      item.policy_action
    }, from the JSON data provided about the product.  Product data: ${JSON.stringify(
    item,
  )}`;

  return item ? justification : 'Item not found';
};

export default ProductSearchPlaygroundSlice.reducer;
