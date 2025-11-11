import { body } from 'express-validator';
import { validateResult } from '../../../shared/helpers/validate.helper';
import { Request, Response, NextFunction } from 'express';

export const validateCreateShipment = [
  // body('trackingNumber')
  //   .notEmpty()
  //   .withMessage('The tracking number is required.')
  //   .isString()
  //   .withMessage('The tracking number must be a string.')
  //   .matches(/^TRK-\d{8}-\d{5}$/)
  //   .withMessage(
  //     'The tracking number must follow the format TRK-YYYYMMDD-XXXXX (e.g. TRK-20251009-12345).',
  //   ),
  body('orderId')
    .notEmpty()
    .withMessage('The order ID is required.')
    .isNumeric()
    .withMessage('The order ID must be a int.')
    .isInt({ min: 0, max: 9999 })
    .withMessage('The order ID must be an integer between 0 and 9999.'),
  body('status')
    .notEmpty()
    .withMessage('The status is required.')
    .isString()
    .withMessage('The status must be a string.')
    .matches(/PENDIENTE/)
    .withMessage(
      'The initial monitoring status should be PENDING.',
    ),
  body('carrier')
    .notEmpty()
    .withMessage('The carrier is required.')
    .isString()
    .withMessage('The carrier must be a string.'),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
