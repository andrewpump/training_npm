// @ts-check
import { z } from 'zod';
import { FilteringInvokable } from '@buildwithlayer/sdk';

import store from '../../app/store';
import { setFilters } from './filteringPlaygroundSlice';

const FilteringPlaygroundInvokables = {
  name: 'Filtering Playground',
  invokables: [
    new FilteringInvokable({
      entityName: 'transactions',
      onFilter: async filters => {
        store.dispatch(setFilters(filters));
        return "Filtered transactions successfully. Don't forget to navigate to the transactions screen.";
      },
      defaultFilters: {
        textFilter: undefined,
        numberFilter: undefined,
        dateFilter: undefined,
      },
      schema: z.object({
        textFilter: z
          .object({
            option: z.enum([
              'contains',
              'notContains',
              'equals',
              'notEquals',
              'startsWith',
              'endsWith',
              'blank',
              'notBlank',
            ]),
            value: z.string(),
          })
          .optional(),
        numberFilter: z
          .object({
            option: z.enum([
              'equals',
              'notEquals',
              'lessThan',
              'lessThanOrEqual',
              'greaterThan',
              'greaterThanOrEqual',
              'inRange',
              'blank',
              'notBlank',
            ]),
            value: z.number(),
          })
          .optional(),
        dateFilter: z
          .object({
            option: z.enum([
              'equals',
              'greaterThan',
              'lessThan',
              'notEqual',
              'inRange',
              'blank',
              'notBlank',
            ]),
            value: z.string(),
          })
          .optional(),
      }),
    }),
  ],
};
export { FilteringPlaygroundInvokables };
