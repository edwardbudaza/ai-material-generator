import { serve } from 'inngest/next';
import { inngest } from '../../../inngest/client';
import {
  createNewUser,
  helloWorld,
  GenerateNotes,
  GenerateStudyTypeContent,
} from '../../../inngest/functions';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here! */
    helloWorld,
    createNewUser,
    GenerateNotes,
    GenerateStudyTypeContent,
  ],
});
