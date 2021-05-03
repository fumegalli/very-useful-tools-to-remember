import {NextFunction, Request, Response} from 'express';
import {UserService} from '../services/User';

class UserController {
  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.create(req.body);

      return res.status(201).json(user);
    } catch (err) {
      return next(err);
    }
  }
}

export {UserController};
