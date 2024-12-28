import { Router } from 'express';
import courseController from '../controller/courseController';
import { validateData } from '../middleware/validationMiddleware';
import { verifyAdminToken } from '../middleware/AdminAuthMiddleware';
import { verifyUserToken } from '../middleware/UserAuthMiddleware';
import { courseSchema } from '../schemas/courseSchema';
import { upload } from '../multer';

const courseRoute = Router();

courseRoute.post(
  '/create',
  upload.any(),
  verifyAdminToken,
  // validateData(courseSchema),
  courseController.create
);

courseRoute.post('/preview', courseController.preview);
courseRoute.get('/course/:id', courseController.getCourseById);

courseRoute.get(
  '/course',
  verifyAdminToken,
  courseController.getAdminCourseList
);

courseRoute.get(
  '/purchase/:courseId',
  verifyUserToken,
  courseController.purchaseCourse
);

export default courseRoute;
