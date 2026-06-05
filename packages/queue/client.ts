import { Queue } from 'bullmq';

const connection = {
  host: process.env.REDIS_HOST!,
  port: parseInt(process.env.REDIS_PORT!),
};

export const eventQueue = new Queue('event-processing', { connection });
export const importQueue = new Queue('import-processing', { connection });

// You can add more queues here as needed
// export const anotherQueue = new Queue('another-queue', { connection });