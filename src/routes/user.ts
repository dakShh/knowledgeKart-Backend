import { Router, Request, Response } from 'express';

import userController from '../controller/userController';

// Middleware
import { validateData } from '../middleware/validationMiddleware';

// Schema
import { userSchema } from '../schemas/userSchema';

const userRoute = Router();

userRoute.post(
  '/register',
  validateData(userSchema),
  userController.registerUser
);

userRoute.post('/login', userController.login);

userRoute.post('/update', (req: Request, res: Response) => {
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
