import { Request, Response } from 'express';

import Exception from '../exceptions/Exception';
import InternalException from '../exceptions/InternalException';
import IErrorResponse from '../interfaces/ErrorResponse';

const normalizeError = (error: Error | null) => {
  if (error instanceof Exception) {
    return error;
  }

  return new InternalException();
};

export const asyncErrorHandler = (
  fn: (req: Request, res: Response) => Promise<void>,
) => {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error) {
      console.log('async error handler', error);

      const exception = normalizeError(error);
      const statusCode = exception?.getStatusCode() as number;
      const body = exception?.getBody() as IErrorResponse;

      res.status(statusCode).json(body);
    }
  };
};
