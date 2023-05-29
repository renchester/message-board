import express, { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';

import Message from '../models/message';

const router = express.Router();

const getAllMessages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const messages = await Message.find({}, { __v: 0 })
    .sort({ date_created: 1 })
    .exec();

  res.json({ messages: messages });
};

// Redirect to messages route
router.get('/', (req, res) => res.redirect('/api/messages'));

// GET all messages
router.get('/messages', asyncHandler(getAllMessages));

// POST request fro creating new message
router.post('/messages', [
  // Validate and sanitize fields.
  body('username', 'Username must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('username', 'Username must be below 50 characters.')
    .trim()
    .isLength({ max: 50 })
    .escape(),
  body('new_message', 'Message must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a new Message object with escaped and trimmed data.
    const message = new Message({
      message: req.body.new_message,
      username: req.body.username,
    });

    if (!errors.isEmpty()) {
      // There are errors. Redirect for now.
      res.redirect('/api/messages');
    } else {
      // Data from form is valid.
      // Save message.
      await message.save();
      getAllMessages(req, res, next);
    }
  }),
]);

export default router;
