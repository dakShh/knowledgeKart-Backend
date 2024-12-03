import { NextFunction, Request, Response } from 'express';

import jwt, { JsonWebTokenError } from 'jsonwebtoken';

export function verifyUserToken() {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.replace('Bearer ', '') || '';
    const jwtSecret = process.env.USER_JWT_SECRET || '';
    if (!token) res.status(401).json({ error: 'Access denied' });

    try {
      const decoded = jwt.verify(token, jwtSecret);
      next();
    } catch (error) {
      const err = error as JsonWebTokenError;
      res.status(401).json({ error: err.message });
    }
  };
}
