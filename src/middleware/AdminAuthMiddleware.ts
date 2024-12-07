import { NextFunction, Request, Response } from 'express';

import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { IUser } from '../types/modelTypes';

interface TokenData extends JwtPayload {
  userId: string;
}

interface AutheticatedRequest extends Request {
  adminId?: string;
}

export function verifyAdminToken(
  req: AutheticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers['authorization']?.replace('Bearer ', '') || '';
  const jwtSecret = process.env.ADMIN_JWT_SECRET || '';
  if (!token) res.status(401).json({ error: 'Access denied | No token' });

  try {
    const decoded = jwt.verify(token, jwtSecret) as TokenData;
    req.body['adminId'] = decoded.userId;
    next();
  } catch (error) {
    const err = error as JsonWebTokenError;
    console.log(err.message);
    res.status(401).json({ error: err.message });
    return;
  }
}
