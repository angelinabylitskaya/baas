import { CallableOptions, onCall } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { MemoryOption } from 'firebase-functions/v2/options';

const runtimeOptions = {
  minInstances: 1,
  maxInstances: 1,
  timeoutSeconds: 540,
  memory: '2GiB' as MemoryOption,
  secrets: [],
} as CallableOptions;

export const callable = onCall(runtimeOptions, ({ data, auth }) => {
  logger.info('Hello callable function logs!', { structuredData: true });

  logger.log(`Hello, ${auth.uid}`);

  return data;
});
