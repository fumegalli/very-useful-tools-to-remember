import { Request, Response } from 'express';
import { ToolService } from '../services/Tool';

class ToolController {
  public static async findAll(_: Request, res: Response) {
    const tools = await ToolService.findAll();

    return res.status(200).json(tools);
  }
}

export { ToolController };