import z from "zod";
import { useDispatch } from "react-redux";
import { Invokable } from "@buildwithlayer/sdk";

export const useGlobalInvokables = () => {
  const dispatch = useDispatch();

  return [
    new Invokable({
      name: "resetPlayground",
      description: "Resets the playground user is currently viewing",
      func: async () => dispatch({ type: RESET_PLAYGROUND }),
      schema: z.object({}),
    }),
  ];
};
