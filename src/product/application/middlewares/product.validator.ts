import { body } from 'express-validator';
import { validateResult } from '../../../shared/helpers/validate.helper';

export const validateProductInfo = [
  body('price')
    .notEmpty()
    .withMessage('The price is required.')
    .isFloat({ gt: 0 })
    .withMessage('The price must be a number greater than 0.')
    .custom((value) => {
      if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        throw new Error('The price must have at most 2 decimal places.');
      }
      return true;
    }),

  body('name').notEmpty().withMessage('The name is required.'),

  body('sku')
    .notEmpty()
    .withMessage('The SKU is required.')
    .isLength({ min: 8, max: 20 })
    .withMessage('The SKU must be between 8 and 20 characters.')
    .isString()
    .withMessage('The SKU must be a string.'),

  body('stock')
    .notEmpty()
    .withMessage('The stock is required.')
    .isInt({ min: 0, max: 9999 })
    .withMessage('The stock must be an integer between 0 and 9999.'),

  body('images')
    .notEmpty()
    .withMessage('The image URL is required.')
    .matches(
      /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))(?:\?.*)?(?:#.*)?$/i
    )
    .withMessage(
      'The image must be a valid URL ending in .png, .jpg, .jpeg, .gif, .svg or .webp.'
    ),

  // ✅ New fields required:
  body('supplierId')
    .notEmpty()
    .withMessage('The supplierId is required.')
    .isInt({ gt: 0 })
    .withMessage('The supplierId must be a positive integer.'),

  body('category')
    .notEmpty()
    .withMessage('The category is required.')
     .isInt({ gt: 0 })
    .withMessage('The category must be a positive integer.'),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];
