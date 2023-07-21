/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import Exception from '../exceptions/Exception';
import InternalException from '../exceptions/InternalException';
import IErrorResponse from '../interfaces/ErrorResponse';

const normalizeError = (error: Error | null) => {
  if (error instanceof Exception) {
    return error;
  }

  return new InternalException();
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('error handler', err);

  const exception = normalizeError(err);
  const statusCode = exception?.getStatusCode() as number;
  const body = exception?.getBody() as IErrorResponse;

  res.status(statusCode).json(body);
};
