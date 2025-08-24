import { IResponse } from "../interfaces/response";

export const statusCode200: IResponse = {
  statusCode: 200,
  message: "User created succesfully.",
};

export const statusCode400ErrorParameters: IResponse = {
  statusCode: 400,
  message:
    "The following parameters are required: email, password, firstName and lastName.",
};

export const statusCode400ErrorPass: IResponse = {
  statusCode: 400,
  message:
    "The password must be at least 8 characters long, with uppercase, lowercase, numbers, and symbols.",
};

export const statusCode400PhoneFormat: IResponse = {
  statusCode: 400,
  message: "The mobile phone must be in the format: +57XXXXXXXXXX.",
};

export const statusCode400ZipCodeFormat: IResponse = {
  statusCode: 400,
  message: "The postal code must be 6 or 9 digits long.",
};

export const statusCode422: IResponse = {
  statusCode: 422,
  message: "The email provided already exists.",
};

export const statusCode550: IResponse = {
  statusCode: 550,
  message: "The email provided does not exist",
};
