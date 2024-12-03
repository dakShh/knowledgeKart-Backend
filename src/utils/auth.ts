import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { ObjectId } from 'mongoose';

const generateToken = (
  res: Response,
  jwtSecret: string,
  userId: string | ObjectId
) => {
  const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
  return token;
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000
  });
};

const clearToken = (res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
};

export { generateToken, clearToken };
