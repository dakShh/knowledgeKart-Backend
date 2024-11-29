import { Response, Request, Router } from 'express';

const adminRoute = Router();

adminRoute.get('/', (req: Request, res: Response) => {
  res.send('admin route');
});

export default adminRoute;
