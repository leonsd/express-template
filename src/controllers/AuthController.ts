import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { AuthService } from '../services/AuthService';

export class AuthController extends BaseController {
  private constructor(private readonly authService: AuthService) {
    super();
  }

  static getInstance(): AuthController {
    const authService = AuthService.getInstance();

    return new AuthController(authService);
  }

  authentication = async (req: Request, res: Response): Promise<void> => {
    const token = await this.authService.authentication(req.body);
    const response = this.response.success.ok({ token });

    res.status(response.statusCode).json(response.body);
  };
}
