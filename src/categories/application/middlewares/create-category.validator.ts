import { body } from 'express-validator';
import { validateResult } from '../../../shared/helpers/validate.helper';

export const validateCreateCategory = [
  body('name').notEmpty().withMessage('The name is required.'),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];
