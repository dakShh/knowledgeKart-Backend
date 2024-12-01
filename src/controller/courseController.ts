import { Request, Response } from 'express';
import { Error } from 'mongoose';

import jwt, { JwtPayload } from 'jsonwebtoken';
import Course from '../model/course';

interface ITokenPayload extends JwtPayload {
  userId: string;
}

interface CourseBody {
  title: string;
  description: string;
  adminId: string;
  imageUrl?: string;
  price: string;
}

async function create(req: Request, res: Response) {
  try {
    const token = req.headers.authorization || '';
    if (!token) throw new Error('Unauthenticated!');

    const jwtSecret = process.env.JWT_SECRET || '';

    const tokenData = jwt.verify(token, jwtSecret) as ITokenPayload;

    const courseBody = req.body as CourseBody;
    const course = new Course({ ...courseBody, adminId: tokenData.userId });
    await course.save();

    res.json({
      status: true,
      message: 'Course Added!',
      course
    });
  } catch (error) {
    const errMessage = error as Error;
    res.json({
      status: false,
      message: errMessage.message ?? 'Error creating course'
    });
  }
}

async function preview(req: Request, res: Response) {
  try {
    const allCourses = await Course.find({}).populate('adminId');
    res.json({
      status: true,
      data: allCourses ?? []
    });
  } catch (error) {
    const errMessage = error as Error;
    res.json({
      status: false,
      message: errMessage.message ?? 'Error creating course'
    });
  }
}

export default { create, preview };
