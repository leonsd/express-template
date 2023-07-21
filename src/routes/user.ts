import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authorizer } from '../middlewares/authorizer';
import { validator } from '../middlewares/validator';
import {
  createEventSchema,
  showEventSchema,
  confirmEventSchema,
} from '../validators/User';

const router = Router();
const controller = UserController.getInstance();

router.post('/', validator(createEventSchema), controller.create);
router.get('/:id', authorizer, validator(showEventSchema), controller.show);
router.patch(
  '/confirm/:email',
  validator(confirmEventSchema),
  controller.confirm
);

export default router;
