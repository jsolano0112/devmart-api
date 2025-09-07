import { body } from "express-validator";
import { validateResult } from "../../../helper/validate.helper";

export const validateCreateOrder = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required.")
    .isInt()
    .withMessage("User ID must be an integer."),
  body("products")
    .isArray({ min: 1 })
    .withMessage("Products must be a non-empty array."),
  body("products.*.id")
    .notEmpty()
    .withMessage("Product ID is required.")
    .isInt()
    .withMessage("Product ID must be an integer."),
  body("products.*.count")
    .notEmpty()
    .withMessage("Product count is required.")
    .isInt({ min: 1 })
    .withMessage("Product count must be at least 1."),
  body("products.*.sellerId")
    .notEmpty()
    .withMessage("Seller ID is required.")
    .isInt()
    .withMessage("Seller ID must be an integer."),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
