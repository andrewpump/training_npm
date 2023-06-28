import store from '../../app/store';
import { Invokable } from "@buildwithlayer/sdk";
import { setForm } from "./formFillingManuallyPlaygroundSlice";
import { z } from 'zod';

const CustomFormFillerInvokables = {
    name: "Custom Form Filler",
    invokables: [
        new Invokable({
            name: "fillForm",
            description:
              "Fill out the form on the page with the given values. Values should be an object with keys corresponding to the id of the input and values corresponding to the value to fill in such as firstName, lastName, email, consented, status, age. [fillFormManual,global]",
            func: async (values) => {
                store.dispatch(setForm({ ...values }))
                return "Changed form values successfully.";
            },
            schema: z.object({
              firstName: z.string().optional(),
              lastName: z.string().optional(),
              email: z.string().optional(),
              consented: z.boolean().optional(),
              status: z.enum(["available", "busy", "other"]).optional(),
              age: z.string().optional(),
            }),
          })
    ]
}

export { CustomFormFillerInvokables }
