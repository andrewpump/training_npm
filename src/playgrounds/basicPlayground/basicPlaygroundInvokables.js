import store from "../../app/store";
import {
  setHeightPercentage,
  setBox1BackgroundColor,
  setBox2BackgroundColor,
  setProgressValue,
  getUnsplashImage,
} from "./basicPlaygroundSlice";
import { z } from "zod";
import { Invokable } from "@buildwithlayer/sdk";
import { FilteringInvokable } from "@buildwithlayer/sdk";

const BasicPlaygroundInvokables = {
  name: "Basic Playground",
  invokables: [
    new Invokable({
      name: "changeUnsplashQuery",
      description:
        "Change the image on screen to similar to query, the input of the function is an unsplash query so convert user information to it [changeUnsplashQuery(),Unsplash Image]",
      func: async ({ query }) => store.dispatch(getUnsplashImage(query)),
      schema: z.object({ query: z.string() }),
    }),

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
    
    new Invokable({
      name: "changeBox1HeightPercentage",
      description:
        "Change the height percentage of Box1 also known as Box 1 [changeBox1Height(),Box 1]",
      func: async ({ height }) => store.dispatch(setHeightPercentage(height)),
      schema: z.object({ height: z.number().min(0).max(100) }),
    }),
    new Invokable({
      name: "changeBox1BackgroundColor",
      description:
        "Change the background color of Box1 also known as Box 1 [changeBox1Color(),Box 1]",
      func: async ({ color }) => store.dispatch(setBox1BackgroundColor(color)),
      schema: z.object({ color: z.string() }),
    }),
    new Invokable({
      name: "changeBox2HeightPercentage",
      description:
        "Change the height percentage of Box2 also known as Box 2 [changeBox2Height(),Box 2]",
      func: async ({ height }) =>
        store.dispatch(setHeightPercentage((1 - height / 100) * 100)),
      schema: z.object({ height: z.number().min(0).max(100) }),
    }),
    new Invokable({
      name: "changeBox2BackgroundColor",
      description:
        "Change the background color of Box2 also known as Box 2 [changeBox2Color(),Box 2]",
      func: async ({ color }) => store.dispatch(setBox2BackgroundColor(color)),
      schema: z.object({ color: z.string() }),
    }),
    new Invokable({
      name: "changeProgressValue",
      description:
        "Change the progress bar completion value [changeProgressValue(),Progress Bar]",
      func: async ({ value }) => store.dispatch(setProgressValue(value)),
      schema: z.object({ value: z.number().min(0).max(100) }),
    }),
  ],
};

export { BasicPlaygroundInvokables };
