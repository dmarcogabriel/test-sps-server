import { APIError } from '@app/core/errors';
import { Request, Response, NextFunction } from 'express';

export default (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof APIError) {
    res.status(error.statusNumber).json({
      message: error.message,
      errors: error.reason
    });
    return;
  }

  res.status(500).json({
    message: "Ops, tivemos problemas, por favor tente novamente mais tarde."
  });
};
