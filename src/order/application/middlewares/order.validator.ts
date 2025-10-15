import { body } from 'express-validator';
import { validateResult } from '../../../shared/helpers/validate.helper';

export const validateOrderInformation = [
  body('products')
    .isArray({ min: 1 })
    .withMessage('Products must be a non-empty array.'),
  body('products.*.id').notEmpty().withMessage('Product ID is required.'),
  body('products.*.count')
    .notEmpty()
    .withMessage('Product count is required.')
    .isInt({ min: 1 })
    .withMessage('Product count must be at least 1.'),
  body('products.*.sellerId')
    .notEmpty()
    .withMessage('The Seller ID is required.'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
