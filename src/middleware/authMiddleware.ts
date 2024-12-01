import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];
  const jwtSecret = process.env.JWT_SECRET || '';

  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
