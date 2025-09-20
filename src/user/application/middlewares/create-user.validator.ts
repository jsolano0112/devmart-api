import { body } from 'express-validator';
import { validateResult } from '../../../helper/validate.helper';

export const validateCreate = [
  body('email')
    .notEmpty()
    .withMessage('The email is required.')
    .isEmail()
    .withMessage('Not a valid e-mail address.'),
  body('password')
    .notEmpty()
    .withMessage('The password is required.')
    .isLength({ min: 8 })
    .withMessage('The password must be at least 8 characters long.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .withMessage(
      'The password must contain at least one uppercase letter, one lowercase letter, and one number.',
    ),
  body('firstName').notEmpty().withMessage('The name is required.'),
  body('lastName').notEmpty().withMessage('The last name is required.'),
  body('mobilePhone')
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage('The mobile phone must be exactly 10 digits.'),
  body('zipCode')
    .optional()
    .matches(/^[0-9]{6}$/)
    .withMessage('The postal code must be exactly 6 digits.'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
