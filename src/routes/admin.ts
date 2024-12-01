import { Response, Request, Router } from 'express';

// Controller
import adminController from '../controller/adminController';

// Middleware
import { validateData } from '../middleware/validationMiddleware';

// Schema
import { adminLoginSchema, adminSchema } from '../schemas/adminSchema';

const adminRoute = Router();

adminRoute.get('/', (req: Request, res: Response) => {
  res.send('admin route');
});

adminRoute.post(
  '/register',
  validateData(adminSchema),
  adminController.register
);

adminRoute.post(
  '/login',
  validateData(adminLoginSchema),
  adminController.login
);

export default adminRoute;
