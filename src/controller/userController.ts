import { Request, Response, RequestHandler } from 'express';

// Model
import User from '../model/user';

import bcrypt from 'bcrypt';
import { generateToken } from '../utils/auth';
import { Error } from 'mongoose';

interface registerUserBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface loginUserBody {
  email: string;
  password: string;
}

async function registerUser(req: Request, res: Response) {
  try {
    const userData = req.body as registerUserBody;
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      throw new Error('User Already Exist. Please Login');
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = new User({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword
    });

    await newUser.save();
    // const token = createSecretToken(user._id);

    res.status(201).json({
      status: true,
      message: 'User signed up :)'
    });
  } catch (error) {
    const errMessage = error as Error;
    res.status(401).json({
      status: false,
      message: errMessage.message ?? 'Error signing up'
    });
  }
}

async function login(req: Request, res: Response) {
  try {
    const userData = req.body as loginUserBody;

    const user = await User.findOne({ email: userData.email });
    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(
      userData.password,
      user?.password
    );

    if (!passwordMatch) throw new Error('Incorrect password!');

    const userJwtSecret = process.env.USER_JWT_SECRET || '';
    const token = generateToken(res, userJwtSecret, user._id);

    res.status(200).json({ status: true, user, token });
  } catch (error) {
    const errMessage = error as Error;
    console.log('error: ', errMessage.message);
    res.status(401).json({
      status: false,
      message: 'Error logging in',
      error: `${errMessage.message}`
    });
  }
}

export default { registerUser, login };
