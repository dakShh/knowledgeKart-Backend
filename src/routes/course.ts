import { Request, Response, Router } from 'express';
import courseController from '../controller/courseController';
import { validateData } from '../middleware/validationMiddleware';
import { courseSchema } from '../schemas/courseSchema';

const courseRoute = Router();

courseRoute.post(
  '/create',
  validateData(courseSchema),
  courseController.create
);

courseRoute.get('/preview', courseController.preview);

export default courseRoute;
