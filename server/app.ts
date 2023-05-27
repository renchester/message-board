import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import apiRouter from './routes/api';

dotenv.config();

// Initialize express app
const app: Express = express();

// Set up Mongoose/MongoDb connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_URL);
    console.log('Connected to database');
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Redirect to api route
app.get('/', (req, res) => {
  res.redirect('/api');
});
app.use('/api', apiRouter);

export default app;
