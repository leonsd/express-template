import { NextFunction, Request, Response } from 'express';

import { BaseController } from './BaseController';
import { UserService } from '../services/UserService';

export class UserController extends BaseController {
  private constructor(private readonly userService: UserService) {
    super();
  }

  static getInstance(): UserController {
    const userService = UserService.getInstance();
    return new UserController(userService);
  }

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const created = await this.userService.create(req.body);
      const response = this.response.success.created(created);

      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  };

  show = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.show(id);
      const response = this.response.success.ok(user);

      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  };

  confirm = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const email = req.params.email;
      const code = req.body.code;
      await this.userService.confirmation(email, code);
      const response = this.response.success.ok({
        message: 'Confirmation successfully',
      });

      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  };
}
