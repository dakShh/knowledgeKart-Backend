import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const adminSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

const Admin = model('Admin', adminSchema);

export default Admin;
