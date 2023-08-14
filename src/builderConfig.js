export const builderConfig = {
  invokableConfig: {
    button: {
      selector: 'button',
      labelContainer: null,
    },
  },
  routes: {
    '/park': {
      name: '/park',
      invokables: {
        buttons: [
          {
            name: 'ResetPlayground',
            description: 'Resets the playground user is currently viewing',
            index: 0,
          },
        ],
      },
    },
  },
};
