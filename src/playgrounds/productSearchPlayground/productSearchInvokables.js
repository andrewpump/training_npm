// @ts-check

import {
  getInsightFromSKU,
  getInsightFromProductName,
} from './productSearchPlaygroundSlice';
import { z } from 'zod';
import { Invokable } from '@buildwithlayer/sdk';

const ProductSearchPlaygroundInvokables = {
  name: 'Navigation Playground',
  invokables: [
    new Invokable({
      name: 'getInsightFromSKU',
      description:
        'returns the policy action justification based on the SKU provided by the user.',
      func: getInsightFromSKU,
      schema: z.object({ sku: z.string() }),
    }),
    new Invokable({
      name: 'getInsightFromProductName',
      description:
        'returns the policy action justification based on the Product Name provided by the user.',
      func: getInsightFromProductName,
      schema: z.object({ product_name: z.string() }),
    }),
  ],
};

export { ProductSearchPlaygroundInvokables };
