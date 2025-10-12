import { body } from 'express-validator';
import { validateResult } from './validate.helper';

export const validateIdNumberBody = [
  body('id')
    .notEmpty()
    .withMessage('The ID is required.')
    .isInt({ gt: 0 })
    .withMessage('The ID must be a positive number.'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
