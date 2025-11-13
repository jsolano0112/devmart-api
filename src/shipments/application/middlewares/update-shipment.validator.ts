import { body } from 'express-validator';
import { validateResult } from '../../../shared/helpers/validate.helper';
import { Request, Response, NextFunction } from 'express';

export const validateUpdateShipment = [
  body('status')
    .notEmpty()
    .withMessage('The status is required.')
    .isString()
    .withMessage('The status must be a string.'),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
