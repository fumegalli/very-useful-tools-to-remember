import express from 'express';
import * as database from './database';
import { handleErrorMiddleware } from './middlewares/handle-error';
import { router } from './routes';

database.connect();

const app = express();

app.use(express.json());
app.use(router);
app.use(handleErrorMiddleware);

export { app };
