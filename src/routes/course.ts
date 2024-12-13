import { Router } from 'express';
import courseController from '../controller/courseController';
import { validateData } from '../middleware/validationMiddleware';
import { verifyAdminToken } from '../middleware/AdminAuthMiddleware';
import { courseSchema } from '../schemas/courseSchema';
import { upload } from '../multer';

const courseRoute = Router();

courseRoute.post(
  '/create',
  verifyAdminToken,
  upload.array('content'),
  validateData(courseSchema),
  courseController.create
);

courseRoute.post('/preview', courseController.preview);
courseRoute.get('/course/:id', courseController.getCourseById);

courseRoute.get(
  '/course',
  verifyAdminToken,
  courseController.getAdminCourseList
);

export default courseRoute;
