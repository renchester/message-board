import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from 'http-errors';
import cors from 'cors';

import apiRouter from './routes/api';
import {
  errorLogger,
  errorResponder,
  invalidPathHandler,
} from './middleware/errorHandlers';

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
app.use(cors());

// Redirect to api route
app.get('/', (req, res) => {
  res.redirect('/api/messages');
});

// API route handler
app.use('/api', apiRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Log the error
app.use(errorLogger);

// Respond to the error
app.use(errorResponder);

// Send response for invalid paths
app.use(invalidPathHandler);

export default app;
