import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/ApiError';

export function handleErrorMiddleware(err: Error, _: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error ${err.message}`,
  });
};
