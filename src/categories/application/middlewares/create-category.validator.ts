import { body } from 'express-validator';
import { validateResult } from '../../../shared/helpers/validate.helper';
import { Request, Response, NextFunction } from 'express';

export const validateCreateCategory = [
  body('name').notEmpty().withMessage('The name is required.'),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
