import { Request, Response } from 'express';
import { ToolService } from '../services/Tool';

class ToolController {
  public static async findAll(req: Request, res: Response) {
    const tools = await ToolService.findAll(req.query.tag as string | undefined);

    return res.status(200).json(tools);
  }
}

export { ToolController };