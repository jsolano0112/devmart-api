import { param } from "express-validator";
import { validateResult } from "../../../helper/validate.helper";

export const validateUserId = [
  param("id")
    .notEmpty()
    .withMessage("The user ID is required.")
    .isInt()
    .withMessage("The user ID must be a number."),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
