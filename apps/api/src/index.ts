import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { db } from '@repo/db';
import { ingestionQueue } from '@repo/queue';
import { ConsentService } from '@repo/consent';
import { flags } from '@repo/features';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});