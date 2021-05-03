import express from 'express';
import apiSchema from './api.schema.json';
import * as database from './database';
import {OpenApiValidator} from 'express-openapi-validator';
import {OpenAPIV3} from 'express-openapi-validator/dist/framework/types';
import {handleErrorMiddleware} from './middlewares/handle-error';
import {router} from './routes';

database.connect();

const app = express();

app.use(express.json());
app.use(router);
app.use(handleErrorMiddleware);

(async () => {
  await new OpenApiValidator({
    apiSpec: apiSchema as OpenAPIV3.Document,
    validateRequests: true,
    validateResponses: true,
  }).install(app);
})();

export {app};
