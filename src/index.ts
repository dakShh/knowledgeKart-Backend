import mongoose from 'mongoose';
import express, { ErrorRequestHandler, Request, Response } from 'express';
import cors from 'cors';

// Routes import
import courseRoute from './routes/course';
import userRoute from './routes/user';
import adminRoute from './routes/admin';

import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Welcome to Auth ts' });
});

app.use('/api/v1/course', courseRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/admin', adminRoute);

async function main() {
  try {
    await mongoose.connect(process.env.MONGOURL || '');
    console.log('database connection successfully');
    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    const err = error as ErrorRequestHandler;
    console.log(`failed to connect database ${err}`);
  }
}

main();
