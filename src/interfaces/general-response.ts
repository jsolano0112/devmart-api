import { IResponse } from "./response";

export const statusCode400: IResponse = {
  statusCode: 400,
  message: "Invalid Parameters.",
};

export const statusCode401: IResponse = {
  statusCode: 401,
  message: "Bad or expired token.",
};

export const statusCode403: IResponse = {
  statusCode: 403,
  message: "Do not have permission to this action.",
};

export const statusCode404: IResponse = {
  statusCode: 404,
  message: "Resource not found.",
};
