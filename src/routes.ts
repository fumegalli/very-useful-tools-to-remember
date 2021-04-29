import { Router } from 'express';
import { ToolController } from './controllers/Tool';

const router = Router();

router.get('/tools', ToolController.findAll);

export { router };
