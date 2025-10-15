import { body } from 'express-validator';
import { validateResult } from '../../../shared/helpers/validate.helper';

export const validateCreateSupplier = [
    body('name')
        .notEmpty()
        .withMessage('The name is required.'),
    body('phoneNumber')
        .notEmpty()
        .withMessage('The phone number is required.')
        .isMobilePhone('any')
        .withMessage('The phone number must be a valid phone number.'),
    body('address')
        .notEmpty()
        .withMessage('The address is required.'),
    body('city')
        .notEmpty()
        .withMessage('The city is required.'),
    body('country')
        .notEmpty()
        .withMessage('The country is required.'),
    body('contactEmail')
        .notEmpty()
        .withMessage('The contact email is required.')
        .isEmail()
        .withMessage('The contact email must be a valid email address.'),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

