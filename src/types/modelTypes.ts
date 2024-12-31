import { ObjectId } from 'mongoose';

export interface IUser extends Document {
  _id: string | ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface IAdmin extends Document {
  _id: string | ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface ICourse extends Document {
  title: string;
  description: string;
  adminId: ObjectId; // admin model reference
  price: string;
  thumbnail: string;
  noOfStudents: number;
  content: {
    title: string;
    description: string;
    video: string;
  }[];
}
