import { IResponse } from '../../../../interfaces/response';

export const userStatusCode200: IResponse = {
  statusCode: 200,
  message: 'User created succesfully.',
};

export const userUpdatedStatusCode200: IResponse = {
  statusCode: 200,
  message: 'User updated succesfully.',
};

export const userStatusCode400ErrorParameters: IResponse = {
  statusCode: 400,
  message: 'Missing required parameters',
};

export const userStatusCode400ErrorPass: IResponse = {
  statusCode: 400,
  message:
    'The password must be at least 8 characters long, with uppercase, lowercase, numbers, and symbols.',
};

export const userStatusCode400PhoneFormat: IResponse = {
  statusCode: 400,
  message: 'The mobile phone must be in the format: +57XXXXXXXXXX.',
};

export const userStatusCode400ZipCodeFormat: IResponse = {
  statusCode: 400,
  message: 'The postal code must be 6 or 9 digits long.',
};

export const userStatusCode409ExistingUser: IResponse = {
  statusCode: 409,
  message: 'The user already exists.',
};

export const userStatusCode422: IResponse = {
  statusCode: 422,
  message: 'The email provided already exists.',
};

export const userStatusCode550: IResponse = {
  statusCode: 550,
  message: 'The email provided does not exist',
};
