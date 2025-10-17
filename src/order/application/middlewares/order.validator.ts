import { body } from 'express-validator';
import { validateResult } from '../../../shared/helpers/validate.helper';

export const validateOrderInformation = [
  body('products')
    .isArray({ min: 1 })
    .withMessage('Products must be a non-empty array.'),
  body('products.*.sku').notEmpty().withMessage('Product SKU is required.'),
  body('products.*.count')
    .notEmpty()
    .withMessage('Product count is required.')
    .isInt({ min: 1 })
    .withMessage('Product count must be at least 1.'),

  body('paymentMethod')
    .notEmpty()
    .withMessage('Payment method is required.')
    .isInt({ min: 1 })
    .withMessage('Payment method must be a valid number.'),

  body('address')
    .notEmpty()
    .withMessage('Address is required.')
    .isString()
    .withMessage('Address must be a string.'),

  body('status')
    .notEmpty()
    .withMessage('Order status is required.')
    .isIn([
      'PENDIENTE',
      'PREPARANDO',
      'EN_TRANSITO',
      'EN_ENTREGA',
      'ENTREGADO',
      'CANCELADO',
      'RECHAZADO',
    ])
    .withMessage(
      'Invalid order status. Must be one of: PENDIENTE, PREPARANDO, EN_TRANSITO, EN_ENTREGA, ENTREGADO, CANCELADO, RECHAZADO.',
    ),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
