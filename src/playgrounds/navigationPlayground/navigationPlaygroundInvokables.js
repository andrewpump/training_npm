// @ts-check
import { NavigationInvokable } from '@buildwithlayer/sdk';

import store from '../../app/store';
import { setTabIndex } from './navigationPlaygroundSlice';

const NavigationPlaygroundInvokables = {
  name: 'Navigation Playground',
  invokables: [
    new NavigationInvokable({
      screens: {
        dashboard: {
          name: 'Dashboard for HR',
          slug: 0,
        },
        transactions: {
          name: 'Transactions for Fraud',
          slug: 1,
        },
        reports: {
          name: 'Reports for Finance',
          slug: 2,
        },
        notifications: {
          name: 'Notifications for Compliance',
          slug: 3,
        },
        help: {
          name: 'Help for Support',
          slug: 4,
        },
      },
      onNavigate: async screenName => {
        console.log(screenName);
        store.dispatch(setTabIndex(screenName.slug));
        return `Navigated to ${screenName} successfully.`;
      },
    }),
  ],
};

export { NavigationPlaygroundInvokables };
