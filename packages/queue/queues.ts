import { Queue } from 'bullmq';

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
};

export const ingestionQueue = new Queue('ingestion', { connection });
export const processingQueue = new Queue('processing', { connection });
export const activationQueue = new Queue('activation', { connection });