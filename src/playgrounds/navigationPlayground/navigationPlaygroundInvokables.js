// @ts-check
import { NavigationInvokable } from "@buildwithlayer/sdk";

import store from "../../app/store";
import { setTabIndex } from "./navigationPlaygroundSlice";

const NavigationPlaygroundInvokables = {
  name: "Navigation Playground",
  invokables: [
    new NavigationInvokable({
      screens: {
        dashboard: {
          name: "Dashboard for HR",
          slug: 0,
        },
        transactions: {
          name: "Transactions for Fraud",
          slug: 1,
        },
      },
      onNavigate: async (screenName) => {
        console.log(screenName);
        store.dispatch(setTabIndex(screenName.slug));
        return `Navigated to ${screenName} successfully.`;
      },
    }),
  ],
};

export { NavigationPlaygroundInvokables };
