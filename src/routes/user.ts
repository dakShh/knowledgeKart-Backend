import { Router, Request, Response } from 'express';

// Controllers
import userController from '../controller/userController';

// Middleware
import { validateData } from '../middleware/validationMiddleware';

// Schema
import { userLoginSchema, userSchema } from '../schemas/userSchema';

const userRoute = Router();

userRoute.post(
  '/register',
  validateData(userSchema),
  userController.registerUser
);

userRoute.post('/login', validateData(userLoginSchema), userController.login);

userRoute.put('/update', (req: Request, res: Response) => {
  res.json({
    status: true,
    message: 'User updated :)'
  });
});

userRoute.post('/purchase/:courseId', (req: Request, res: Response) => {
  res.json({
    status: true,
    message: 'Course purchased :)'
  });
});

userRoute.get('/purchases', (req: Request, res: Response) => {
  res.json({
    status: true,
    message: 'List of purchased courses :)'
  });
});

userRoute.post('/updatePassword', (req: Request, res: Response) => {
  res.json({
    status: true,
    message: 'Password updated'
  });
});

export default userRoute;
