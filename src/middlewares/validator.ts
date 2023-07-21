import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { response } from '../utils/responses';

export const validator = (validationSchema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = await validationSchema.validateAsync(req, {
        abortEarly: false,
        stripUnknown: true,
      });

      req = Object.assign(req, { body });
      next();
    } catch (error) {
      const exception = response.error.badRequest({
        message: error.message,
      });

      res.status(exception.statusCode).json(exception.body);
    }
  };
};
