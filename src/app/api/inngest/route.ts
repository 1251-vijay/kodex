import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { demoError, helloWorld } from "@/inngest/functions";


export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld,
    demoError
    /* your functions will be passed here later! */
  ],
});