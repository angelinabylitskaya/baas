import { onSchedule } from 'firebase-functions/v2/scheduler';
import * as logger from 'firebase-functions/logger';

export const scheduled = onSchedule(
  { schedule: 'every day 08:05' },
  async () => {
    logger.info('Hello scheduled function logs!', { structuredData: true });
  }
);
