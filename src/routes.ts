import { Router } from 'express';
import { ToolController } from './controllers/Tool';

const router = Router();

router.get('/tools', ToolController.findAll);
router.post('/tools', ToolController.create);
router.delete('/tools/:id', ToolController.delete);

export { router };
