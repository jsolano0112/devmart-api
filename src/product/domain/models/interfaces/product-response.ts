import { IResponse } from '../../../../shared/interfaces/response';

export const productStatusCode200: IResponse = {
  statusCode: 200,
  message: 'Product created succesfully.',
};

export const productUpdatedStatusCode200: IResponse = {
  statusCode: 200,
  message: 'Product updated succesfully.',
};

export const productStatusCode400ErrorParameters: IResponse = {
  statusCode: 400,
  message: 'Missing required parameters',
};

export const productStatusCode400ErrorPass: IResponse = {
  statusCode: 400,
  message:
    'The password must be at least 8 characters long, with uppercase, lowercase, numbers, and symbols.',
};


export const productStatusCode409ExistingProduct: IResponse = {
  statusCode: 409,
  message: 'The product already exists.',
};
