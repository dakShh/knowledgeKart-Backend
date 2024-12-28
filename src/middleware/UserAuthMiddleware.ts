import { NextFunction, Request, Response } from 'express';

import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';

interface TokenData extends JwtPayload {
  userId: string;
}

interface AutheticatedRequest extends Request {
  userId?: string;
}

export function verifyUserToken(
  req: AutheticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers['authorization']?.replace('Bearer ', '') || '';
  const jwtSecret = process.env.USER_JWT_SECRET || '';
  if (!token) res.status(401).json({ error: 'Access denied' });
  try {
    const decoded = jwt.verify(token, jwtSecret) as TokenData;
    req.body['userId'] = decoded.userId;
    next();
  } catch (error) {
    const err = error as JsonWebTokenError;
    res.status(401).json({ error: err.message });
    return;
  }
}
