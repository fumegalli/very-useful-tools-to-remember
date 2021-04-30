import { NextFunction, Request, Response } from 'express';
import { ToolService } from '../services/Tool';

export interface CreateToolRequest {
  title: string;
  link: string;
  description: string;
  tags: string[];
};

class ToolController {
  public static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tools = await ToolService.findAll(req.query.tag as string | undefined);

      return res.status(200).json(tools);
    } catch (err) {
      return next(err);
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const tool = await ToolService.create(req.body);

      return res.status(201).json(tool);
    } catch (err) {
      return next(err);
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await ToolService.deleteById(req.params.id);

      return res.sendStatus(204);
    } catch (err) {
      return next(err);
    }
  }
}

export { ToolController };