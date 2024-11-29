import { Router, Request, Response } from 'express';

const userRoute = Router();

userRoute.post('/create', (req: Request, res: Response) => {
  res.json({
    status: true,
    message: 'User signed up :)'
  });
});

userRoute.post('/signIn', (req: Request, res: Response) => {
  res.json({
    status: true,
    message: 'User signed in :)'
  });
});

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
