import {
  onDocumentCreated,
  onDocumentUpdated,
} from 'firebase-functions/v2/firestore';
import * as logger from 'firebase-functions/logger';

export const createdTrigger = onDocumentCreated(
  'collection/{documentId}',
  ({ data: snapshot, params }) => {
    logger.info('Hello create trigger function logs!', {
      structuredData: true,
    });

    logger.log(`New document, ${params.documentId}`);

    return snapshot.data();
  }
);

export const updatedTrigger = onDocumentUpdated(
  'collection/{documentId}',
  ({ data: snapshot, params }) => {
    logger.info('Hello update trigger function logs!', {
      structuredData: true,
    });

    logger.log(`New document, ${params.documentId}`);

    return {
      before: snapshot.before.data(),
      after: snapshot.after.data(),
    };
  }
);
