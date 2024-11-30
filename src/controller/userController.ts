import { Request, Response, RequestHandler } from 'express';

// Model
import User from '../model/user';

import bcrypt from 'bcrypt';

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
      res.status(404).send('User Already Exist. Please Login');
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = new User({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword
    });

    const user = await newUser.save();
    // const token = createSecretToken(user._id);

    res.status(201).json({
      status: true,
      message: 'User signed up :)'
    });
  } catch (error) {
    console.log('error while registering: ');
    res.json({
      status: false,
      message: 'Error signing up'
    });
  }
}

async function login(req: Request, res: Response) {
  try {
    const userData = req.body as loginUserBody;

    const user = await User.findOne({ email: userData.email });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(
      userData.password,
      user?.password as string
    );

    if (!passwordMatch) {
      // res.status(401).json({ message: 'Incorrect password' });
      throw new Error('incorrect password!');
    }

    res.json({
      status: true,
      message: 'Authenticated'
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Error logging in',
      error: `${error}`
    });
  }
}

export default { registerUser, login };
