import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const courseSchema = new Schema({
  title: String,
  description: String,
  adminId: { type: Schema.Types.ObjectId, ref: 'Admin' },
  imageUrl: String,
  price: String
});

const Course = model('Course', courseSchema);

export default Course;
