import { Response, Request, Router } from 'express';
import { verifyAdminToken } from '../middleware/AdminAuthMiddleware';
import dashboardController from '../controller/dashboardController';

const dashboardRoute = Router();

dashboardRoute.get(
  '/data',
  verifyAdminToken,
  dashboardController.dashboardData
);

export default dashboardRoute;
