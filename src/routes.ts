import {Router} from 'express';
import {ToolController} from './controllers/Tool';

// eslint-disable-next-line new-cap
const router = Router();

router.get('/tools', ToolController.findAll);
router.post('/tools', ToolController.create);
router.delete('/tools/:id', ToolController.delete);

export {router};
