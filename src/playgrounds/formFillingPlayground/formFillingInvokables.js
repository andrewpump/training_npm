// @ts-check
import { FormFillingInvokable } from '@buildwithlayer/sdk';

import store from '../../app/store';
import { setForm } from './formFillingPlaygroundSlice';

const FormFillerInvokables = {
  name: 'Form Filler',
  invokables: [
    new FormFillingInvokable({
      onValues: async values => {
        store.dispatch(setForm(values));
        return 'Filled out the form!';
      },
    }),
  ],
};

export { FormFillerInvokables };
