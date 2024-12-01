import mongoose from 'mongoose';
import { IAdmin } from '../types/modelTypes';

const { Schema, model } = mongoose;

const adminSchema = new Schema<IAdmin>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});

const Admin = model('Admin', adminSchema);

export default Admin;
