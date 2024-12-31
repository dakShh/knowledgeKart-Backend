import { Request, Response } from 'express';
import { Error } from 'mongoose';

import jwt, { JwtPayload } from 'jsonwebtoken';
import Course from '../model/course';
import { cloudinaryUploadFile } from '../cloudinary';
import fs from 'fs';
import Purchase from '../model/purchases';
import mongoose from 'mongoose';
interface ITokenPayload extends JwtPayload {
  userId: string;
}

interface CourseBody {
  title: string;
  description: string;
  price: string;
  adminId: string;
  content: {
    title: string;
    description: string;
    video: string;
  };
}

async function create(req: Request, res: Response) {
  try {
    const files = req.files;
    const body = req.body;

    // UPLOAD THUMBNAIL
    const thumbnailFiles = (files as Express.Multer.File[])?.filter(
      (file) => file.fieldname === 'thumbnail'
    )?.[0];

    if (thumbnailFiles) {
      const { path } = thumbnailFiles;
      const res = await cloudinaryUploadFile(path);
      body.thumbnail = res?.secure_url;
      fs.unlinkSync(path);
    }

    // UPLOAD VIDEO
    const videoFiles = (files as Express.Multer.File[])?.filter(
      (file) => file.fieldname !== 'thumbnail'
    );

    for (let i = 0; i < body.content.length; i++) {
      const { path } = videoFiles[i];
      const res = await cloudinaryUploadFile(path);
      body.content[i].video = res?.secure_url;
      fs.unlinkSync(path);
    }

    const course = new Course(body as CourseBody);
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

async function purchaseCourse(req: Request, res: Response) {
  try {
    const body = req.body;
    const params = req.params;

    const checkIfEntrolled = await Purchase.findOne({
      userId: body.userId,
      courseId: params.courseId
    });

    if (checkIfEntrolled) {
      throw new Error('Already Enrolled!! :)');
    }

    const purchase = new Purchase({
      userId: body.userId,
      courseId: params.courseId
    });

    await purchase.save();
    res.status(200).json({
      status: true,
      message: `Successfully Purchased Course! `
    });
  } catch (error) {
    const errMessage = error as Error;
    console.log({ errMessage });
    res.status(401).json({
      status: false,
      message: errMessage.message ?? 'Error while purchasing the course'
    });
  }
}

async function checkEnrollment(req: Request, res: Response) {
  try {
    console.log('req: ', req.body);
    console.log('courseid', req.params);

    const body = req.body;
    const params = req.params;

    const hasPurchased = await Purchase.findOne({
      userId: body.userId,
      courseId: params.courseId
    });

    res.json({
      status: true,
      data: hasPurchased
    });
  } catch (error) {
    const errMessage = error as Error;
    console.log({ errMessage });
    res.status(401).json({
      status: false,
      message: errMessage.message ?? 'Error while purchasing the course'
    });
  }
}

export default {
  create,
  preview,
  getAdminCourseList,
  getCourseById,
  purchaseCourse,
  checkEnrollment
};
