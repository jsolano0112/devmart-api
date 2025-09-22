import { body } from 'express-validator';
import { validateResult } from '../../../shared/helpers/validate.helper';
import mongoose from 'mongoose';

export const validateCreateOrder = [
  body('userId')
    .notEmpty()
    .withMessage('The ID is required.')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('The ID must be a valid 24-character hex string.');
      }
      return true;
    }),
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
    .withMessage('The Seller ID is required.')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('The ID must be a valid 24-character hex string.');
      }
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
