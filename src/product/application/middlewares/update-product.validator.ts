import { body } from 'express-validator';
import { validateResult } from '../../../shared/helpers/validate.helper';

export const validateUpdateProduct = [
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
    .withMessage('The sku is required.')
    .isLength({ min: 8, max: 20 })
    .withMessage('The SKU must be beetwen 8 and 20 characters.')
    .isString()
    .withMessage('The SKU must be a string.'),

  body('stock')
    .notEmpty()
    .withMessage('The stock is required.')
    .isInt({ min: 0, max: 9999 })
    .withMessage('The stock must be an integer between 0 and 9999.'),

  body('images')
    .notEmpty()
    .matches(
      /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))(?:\?.*)?(?:#.*)?$/i,
    )
    .withMessage(
      'The images must be a valid URL and max size 2MB, min 800x600px .',
    ),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
