import { Request, Response } from 'express';
import Course from '../model/course';
import mongoose from 'mongoose';
async function dashboardData(req: Request, res: Response) {
  try {
    const body = req.body;

    const result = await Course.aggregate([
      { $match: { adminId: new mongoose.Types.ObjectId(body.adminId) } }, // Filter by creatorId
      {
        $group: {
          _id: '$adminId',
          totalCourses: { $sum: 1 },
          totalStudents: { $sum: '$noOfStudents' }
        }
      }
    ]);

    const dashboardData = result?.[0];

    res.json({
      status: true,
      data: {
        noOfCourses: dashboardData?.totalCourses ?? 0,
        noOfEnrollments: dashboardData?.totalStudents ?? 0
      }
    });
  } catch (error) {
    const errMessage = error as Error;
    console.log('dashboardData error: ', errMessage.message);
    res.status(401).json({
      status: false,
      message: errMessage.message ?? 'Error logging in'
    });
  }
}

export default {
  dashboardData
};
