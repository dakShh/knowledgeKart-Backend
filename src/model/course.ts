import mongoose from 'mongoose';
import { ICourse } from '../types/modelTypes';

const { Schema, model } = mongoose;

const courseSchema = new Schema<ICourse>({
  title: String,
  description: String,
  adminId: { type: Schema.Types.ObjectId, ref: 'Admin' },
  imageUrl: String,
  price: String,
  content: [String]
});

const Course = model('Course', courseSchema);

export default Course;
