// @ts-check
import { UnstableOpenApiInvokable } from '@buildwithlayer/sdk';

import store from '../../app/store';
import { setResponse } from './apiPlaygroundSlice';

import countryDataApiSpec from './country-data-api.json';

const ApiPlaygroundInvokables = {
  name: 'Api Playground',
  invokables: [
    new UnstableOpenApiInvokable({
      name: 'countriesApi',
      description:
        'useful for when human wants to know anything about countries',
      spec: countryDataApiSpec,
      onResponse: async response => {
        store.dispatch(setResponse(response));
        return 'Response set!';
      },
      headers: {
        'Content-Type': 'application/json',
        'X-BLOBR-KEY': `${process.env.REACT_APP_X_BLOBR_KEY}`,
      },
    }),
  ],
};

export { ApiPlaygroundInvokables };
