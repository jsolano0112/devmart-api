import { body } from 'express-validator';
import { validateResult } from '../../../shared/helpers/validate.helper';

export const validateSupplier = [
  body('name')
    .notEmpty()
    .withMessage('The supplier name is required.')
    .isString()
    .withMessage('The supplier name must be a string.'),

  body('email')
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Invalid email format.'),

  body('nit')
    .notEmpty()
    .withMessage('NIT is required.')
    .matches(/^\d{9}-\d{1}$/)
    .withMessage('Invalid NIT format. It must be like 123456789-1.'),

  body('phone').optional().isString().withMessage('Phone must be a string.'),

  body('address')
    .optional()
    .isString()
    .withMessage('Address must be a string.'),

  body('city').optional().isString().withMessage('City must be a string.'),

  body('country')
    .optional()
    .isString()
    .withMessage('Country must be a string.'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean.'),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];
