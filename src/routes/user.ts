import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authorizer } from '../middlewares/authorizer';
import { asyncErrorHandler } from '../middlewares/asyncErrorHandler';
import { validator } from '../middlewares/validator';
import {
  createEventSchema,
  showEventSchema,
  confirmEventSchema,
} from '../validators/User';

const router = Router();
const controller = UserController.getInstance();

router.post(
  '/',
  validator(createEventSchema),
  asyncErrorHandler(controller.create),
);
router.get(
  '/:id',
  authorizer,
  validator(showEventSchema),
  asyncErrorHandler(controller.show),
);
router.patch(
  '/confirm/:email',
  validator(confirmEventSchema),
  asyncErrorHandler(controller.confirm),
);

export default router;
