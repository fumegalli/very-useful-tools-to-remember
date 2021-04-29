import express from 'express';
import * as database from './database';
import { router } from './routes';

database.connect();

const app = express();

app.use(express.json());
app.use(router);

export { app };
