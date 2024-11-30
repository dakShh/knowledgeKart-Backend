import express, { Request, Response, Router } from 'express';

const coursesRoute = Router();

coursesRoute.post('/create', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Course created successfully' });
});

coursesRoute.get('/preview', (req: Request, res: Response) => {
  res.json({
    status: 200,
    message: 'heres the list of active coursescourses'
  });
});

export default coursesRoute;
