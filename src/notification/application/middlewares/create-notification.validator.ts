import { body } from 'express-validator';
import { validateResult } from '../../../shared/helpers/validate.helper';
import mongoose from 'mongoose';

export const validateCreateNotification = [
  body('type')
    .notEmpty()
    .withMessage('The type is required.')
    .isString()
    .withMessage('The type must be a string.'),

  body('message')
    .notEmpty()
    .withMessage('The message is required.')
    .isString()
    .withMessage('The message must be a string.'),

  body('userId')
    .notEmpty()
    .withMessage('The userId is required.')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('The userId must be a valid 24-character hex string.');
      }
      return true;
    }),

  body('createdAt')
    .optional({ nullable: true })
    .isISO8601()
    .withMessage('The createdAt must be a valid date.'),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];
