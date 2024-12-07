import { Router } from 'express';
import courseController from '../controller/courseController';
import { validateData } from '../middleware/validationMiddleware';
import { verifyAdminToken } from '../middleware/AdminAuthMiddleware';
import { courseSchema } from '../schemas/courseSchema';

const courseRoute = Router();

courseRoute.post(
  '/create',
  validateData(courseSchema),
  verifyAdminToken,
  courseController.create
);

courseRoute.get('/preview', courseController.preview);

export default courseRoute;
