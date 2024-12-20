import mongoose from 'mongoose';
import { ICourse } from '../types/modelTypes';

const { Schema, model } = mongoose;

const courseSchema = new Schema<ICourse>({
  title: String,
  description: String,
  adminId: { type: Schema.Types.ObjectId, ref: 'Admin' },
  price: String,
  thumbnail: String,
  content: [
    {
      title: String,
      description: String,
      video: String
    }
  ]
});

const Course = model('Course', courseSchema);

export default Course;
