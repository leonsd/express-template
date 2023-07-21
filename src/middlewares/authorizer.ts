import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { response } from '../utils/responses';
import InternalException from '../exceptions/InternalException';

const forbiddenException = response.error.forbidden({
  message: 'Forbidden access',
});

const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new InternalException('environment variable JWT_SECRET not set');
  }

  return new Promise((resolve, reject) => {
    verify(token, secret, (err) => {
      if (err) {
        reject(err);
      }

      resolve(true);
    });
  });
};

export const authorizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.token as string;

  if (!token) {
    return res
      .status(forbiddenException.statusCode)
      .json(forbiddenException.body);
  }

  try {
    await verifyToken(token);
    next();
  } catch (error) {
    return res
      .status(forbiddenException.statusCode)
      .json(forbiddenException.body);
  }
};
