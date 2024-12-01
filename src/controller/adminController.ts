import { Request, Response } from 'express';

import { Error } from 'mongoose';

import Admin from '../model/admin';

import bcrypt from 'bcrypt';

import { generateToken } from '../utils/auth';

interface AdminRegisterBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AdminLoginBody {
  email: string;
  password: string;
}

async function register(req: Request, res: Response) {
  try {
    const adminBody = req.body as AdminRegisterBody;

    const existingAdmin = await Admin.findOne({ email: adminBody.email });
    if (existingAdmin) throw new Error('Account already exists. Please Login');

    const salt = 10;
    const hashedPassword = await bcrypt.hash(adminBody.password, salt);

    const createAdmin = new Admin({
      firstName: adminBody.firstName,
      lastName: adminBody.lastName,
      email: adminBody.email,
      password: hashedPassword
    });

    await createAdmin.save();
    res.status(201).json({
      status: true,
      message: 'Admin registered :)'
    });
  } catch (error) {
    const errMessage = error as Error;
    res.json({
      status: false,
      message: errMessage.message ?? 'Error registering admin'
    });
  }
}

async function login(req: Request, res: Response) {
  try {
    const adminBody = req.body as AdminLoginBody;

    const existingAdmin = await Admin.findOne({ email: adminBody.email });

    if (!existingAdmin) {
      throw new Error('Account not found. Please register');
    }

    const passwordMatch = await bcrypt.compare(
      adminBody.password,
      existingAdmin?.password as string
    );

    if (!passwordMatch) throw new Error('incorrect password!');

    const token = generateToken(res, existingAdmin._id);
    console.log({ token });
    res.status(201).json({ token });
  } catch (error) {
    const errMessage = error as Error;
    res.json({
      status: false,
      message: errMessage.message ?? 'Error logging in'
    });
  }
}

export default { register, login };
