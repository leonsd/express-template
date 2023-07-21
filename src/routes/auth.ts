import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { asyncErrorHandler } from '../middlewares/asyncErrorHandler';
import { validator } from '../middlewares/validator';
import { authEventSchema } from '../validators/Auth';

const router = Router();
const controller = AuthController.getInstance();

router.post(
  '/',
  validator(authEventSchema),
  asyncErrorHandler(controller.authentication),
);

export default router;
