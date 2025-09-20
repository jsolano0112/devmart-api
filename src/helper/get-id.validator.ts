import { param } from 'express-validator';
import { validateResult } from './validate.helper';

export const validateId = [
  param('id')
    .notEmpty()
    .withMessage('The ID is required.')
    .isInt()
    .withMessage('The ID must be a number.'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
