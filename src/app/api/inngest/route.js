import { serve } from 'inngest/next';
import { inngest } from '../../../inngest/client';
import { CreateNewUser, helloWorld } from '../../../inngest/functions';

// Create an API that serves zero functions
export const { GET, POST } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
    helloWorld,
    CreateNewUser,
  ],
});
