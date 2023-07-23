// @ts-check
import { z } from "zod";
import { FilteringInvokable } from "@buildwithlayer/sdk";

import store from "../../app/store";
import { setFilters } from "./filteringPlaygroundSlice";

const FilteringPlaygroundInvokables = {
  name: "Filtering Playground",
  invokables: [
    new FilteringInvokable({
      entityName: "transactions",
      onFilter: async (filters) => {
        store.dispatch(setFilters(filters));
        return "Filtered transactions successfully. Don't forget to navigate to the transactions screen.";
      },
      defaultFilters: {
        startDate: new Date(),
        endDate: new Date(),
        category: "",
        amount: 0,
      },
      schema: z.object({
        startDate: z.any().optional(),
        endDate: z.any().optional(),
        category: z.any().optional(),
        amount: z.any().optional(),
      }),
    }),
  ],
};

export { FilteringPlaygroundInvokables };
