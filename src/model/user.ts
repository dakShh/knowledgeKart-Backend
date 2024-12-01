import mongoose, { Document, ObjectId } from 'mongoose';
import { IUser } from '../types/modelTypes';

const { Schema, model } = mongoose;

const userSchema = new Schema<IUser>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});

const User = model('User', userSchema);

export default User;
