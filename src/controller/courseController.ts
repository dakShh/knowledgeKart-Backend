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
    const courseBody = req.body as CourseBody;
    const course = new Course(courseBody);
    await course.save();

    res.status(200).json({
      status: true,
      message: `${course.title} Course Added! `,
      course: course
    });
  } catch (error) {
    const errMessage = error as Error;
    res.status(401).json({
      status: false,
      message: errMessage.message ?? 'Error creating course'
    });
  }
}

async function preview(req: Request, res: Response) {
  try {
    const allCourses = await Course.find({}).populate('adminId');
    res.status(201).json({
      status: true,
      data: allCourses ?? []
    });
  } catch (error) {
    const errMessage = error as Error;
    res.status(401).json({
      status: false,
      message: errMessage.message ?? 'Error fetching all course'
    });
  }
}

async function getAdminCourseList(req: Request, res: Response) {
  try {
    const allCourses = await Course.find({
      adminId: req.body.adminId || ''
    });
    res.status(201).json({
      status: true,
      data: allCourses ?? []
    });
  } catch (error) {
    const errMessage = error as Error;
    res.status(401).json({
      status: false,
      message: errMessage.message ?? 'Error fetching all course'
    });
  }
}

async function getCourseById(req: Request, res: Response) {
  try {
    const course = await Course.findOne({
      _id: req.params.id || ''
    }).populate('adminId');

    res.status(201).json({
      status: true,
      data: course
    });
  } catch (error) {
    const errMessage = error as Error;
    console.log({ errMessage });
    res.status(401).json({
      status: false,
      message: errMessage.message ?? 'Error fetching course information'
    });
  }
}
export default { create, preview, getAdminCourseList, getCourseById };
