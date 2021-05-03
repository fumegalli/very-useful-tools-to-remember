import {Router} from 'express';
import {ToolController} from './controllers/Tool';
import {UserController} from './controllers/User';
import swaggerUi from 'swagger-ui-express';
import apiSchema from './api.schema.json';

// eslint-disable-next-line new-cap
const router = Router();

router.get('/tools', ToolController.findAll);
router.post('/tools', ToolController.create);
router.delete('/tools/:id', ToolController.delete);

router.post('/users', UserController.create);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSchema));

export {router};
