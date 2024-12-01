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
    res.json({
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

    if (!passwordMatch) throw new Error('incorrect password!');
    const token = generateToken(res, user._id);

    // res
    //   .cookie('access_token', token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production'
    //   })
    //   .status(200)
    //   .json({ message: 'Logged in successfully' });

    res.status(200).json({ token });
  } catch (error) {
    const errMessage = error as Error;
    res.json({
      status: false,
      message: 'Error logging in',
      error: `${errMessage.message}`
    });
  }
}

export default { registerUser, login };
